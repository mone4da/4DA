class Peer{
    constructor(config){
        this.initialze(config)        
    }

    initialze(config){
        this.conn = new RTCPeerConnection(config)
        this.conn.ontrack = event => this.onTracks(event.streams[0].getTracks()) 
        this.conn.onicecandidate = async event => event.candidate && this.onIceCandidate(event.candidate) 
    }

    onIceCandidate(candidate){}
    onTracks(tracks){}

    addCandidate(candidate) {
        this.conn.remoteDescription && this.conn.addIceCandidate(new RTCIceCandidate(candidate))
      }
}

class Caller extends Peer{
    constructor(config){
        super(config)
    }

    async createOffer(){
        let offer = await this.conn.createOffer()
        await this.conn.setLocalDescription(offer)
       
        return offer
    }

    async ready(answer){
        if (!this.conn.currentRemoteDescription){
            await this.conn.setRemoteDescription(answer)
        }
    }

}

class Callee extends Peer{
    constructor(config, handle){
        super(config, handle)
    }

    async createAnswer(offer){
        this.conn.setRemoteDescription(offer)
        let answer = await this.conn.createAnswer()
        await this.conn.setLocalDescription(answer)

        return answer
    }
}

class StreamPeer extends Peer{
    constructor(config){
        super(config)
    }

    onStreams(){}

    initialze(con){
        super.initialze()        

        this.remoteStream = new MediaStream()        

        navigator
        .mediaDevices
        .getUserMedia({video: true, audio: false})
        .then(stream => {
            this.localStream = stream

            this.localStream
                .getTracks()
                .forEach(track => this.conn.addTrack(track, this.localStream))

            this.onStreams()
        })

    }

    onTracks(tracks){
        tracks.forEach(track => this.remoteStream.addTrack(track))
    }
}

class StreamCaller extends StreamPeer{
    constructor(config){
        super(config)
    }

    async createOffer(){
        let offer = await this.conn.createOffer()
        await this.conn.setLocalDescription(offer)
       
        return offer
    }

    async ready(answer){
        if (!this.conn.currentRemoteDescription){
            await this.conn.setRemoteDescription(answer)
        }
   }

}

class StreamCallee extends StreamPeer{
    constructor(config){
        super(config)
    }

    async createAnswer(offer){
        this.conn.setRemoteDescription(offer)
        let answer = await this.conn.createAnswer()
        await this.conn.setLocalDescription(answer)

        return answer
    }
}

export {
    StreamCaller,
    StreamCallee
}