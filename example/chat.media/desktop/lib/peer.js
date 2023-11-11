class Peer{
    constructor(config, handle){
        this.conn = new RTCPeerConnection(config)
        this.conn.ontrack = event => handle('track', {source: this,  tracks: event.streams[0].getTracks()})
        this.conn.onicecandidate = async event => event.candidate && handle('ice', {source: this, candidate: event.candidate})

        this.initialzed(handle)        
    }

    initialzed(handle){
        handle('initialized', {source: this})
    }

    shareLocalStream(stream){
        stream.getTracks().forEach(track => {
            this.conn.addTrack(track, stream)
        })
    }

    addCandidate(candidate) {
        this.conn.remoteDescription && this.conn.addIceCandidate(new RTCIceCandidate(candidate))
      }
}

class Caller extends Peer{
    constructor(handle){
        super(handle)
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
    constructor(handle){
        super(handle)
    }

    async createAnswer(offer){
        this.conn.setRemoteDescription(offer)
        let answer = await this.conn.createAnswer()
        await this.conn.setLocalDescription(answer)

        return answer
    }
}

export {
    Caller,
    Callee
}