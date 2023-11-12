import XKet from './ket.js'
import XBra from './bra.js'
import {Caller, Callee} from './lib/peer.js'

const RTCPconfig = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302', 
                'stun:stun1.l.google.com:19302'/*, 
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302'*/]
        }
    ]
}

class NetCaller extends Caller{
    constructor(){
        super(RTCPconfig)
    }

    initialze(config){
        super.initialze(config)  
        
        this.remoteStream = new MediaStream()        

        navigator
        .mediaDevices
        .getUserMedia({video: true, audio: false})
        .then(stream => {
            this.localStream = stream
            ket.initVideos( this.localStream, this.remoteStream )

            this.localStream
                .getTracks()
                .forEach(track => this.conn.addTrack(track, this.localStream))

            this.createOffer()
        })
    }

    onTracks(tracks){
        console.log('tracks', tracks)
        tracks.forEach(track => this.remoteStream.addTrack(track))
    }

    onIceCandidate(candidate){
        console.log('send candidate', candidate)

        bra.sendIce(candidate)
    }

    createOffer(){
        super.createOffer().then(offer => {
            console.log('send offer', offer)

            bra.sendOffer(offer)
        })
    }
}

class NetCallee extends Callee{
    constructor(){
        super(RTCPconfig)
    }

    initialze(config){
        super.initialze(config)        

        this.remoteStream = new MediaStream()        

        navigator
        .mediaDevices
        .getUserMedia({video: true, audio: false})
        .then(stream => {
            this. localStream = stream

            ket.initVideos( this.localStream, this.remoteStream )

            this.localStream
                .getTracks()
                .forEach(track => this.conn.addTrack(track, this.localStream))
        })
    }

    onTracks(tracks){
        console.log('tracks', tracks)
        tracks.forEach(track => this.remoteStream.addTrack(track))
    }

    onIceCandidate(candidate){
        console.log('send candidate', candidate)
        bra.sendIce(candidate)
    }

    createAnswer(offer){
        super.createAnswer(offer).then(answer => {
            console.log('send answer', answer)
            bra.sendAnswer(answer)
        })
    }
}

class Bra extends XBra{
    constructor(){
        super()
    }

    onOffer(offer){
        console.log('onOffer', offer)
        peer.createAnswer(offer)
        ket.showBye('')
    }

    onIce(candidate){
        console.log('onIce', candidate)
        peer.addCandidate(candidate)
    }

    onAnswer(answer){
        console.log('onAnswer', answer)
        peer.ready(answer)
        ket.showBye('')
    }

    onHangup(data){
        console.log('hangup', data)
        ket.showBye(data)
    }
}

class Ket extends XKet{
    constructor(){
        super()
    }
}

let ket = new Ket()
let bra = new Bra()
let peer = new NetCaller()


