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
        console.log('candidate', candidate)

        bra.sendIce(candidate)
    }

    createOffer(){
        super.createOffer().then(offer => {
            console.log('offer', offer)

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

        navigator
        .mediaDevices
        .getUserMedia({video: true, audio: false})
        .then(stream => {
            this. localStream = stream
            this.remoteStream = new MediaStream()

            ket.initVideos( this.localStream, this.remoteStream )

            this.localStream
                .getTracks()
                .forEach(track => this.conn.addTrack(track, this.localStream))

            this.createAnswer()

        })
    }

    onTracks(tracks){
        console.log('tracks', tracks)
        tracks.forEach(track => this.remoteStream.addTrack(track))
    }

    onIceCandidate(candidate){
        console.log('candidate', candidate)
    }

    createAnswer(){
        super.createAnswer().then(answer => {
            console.log('answer', answer)
        })
    }
}

class Bra extends XBra{
    constructor(){
        super()
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


