import XKet from './ket.js'
import XBra from './bra.js'
import {StreamCaller, StreamCallee} from './lib/peer.js'
import { RTCPconfig } from './config.js'

class NetCaller extends StreamCaller{
    constructor(){
        super(RTCPconfig)
    }

    onStreams(){
        ket.initVideos( this.localStream, this.remoteStream )
        this.createOffer()
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

class NetCallee extends StreamCallee{
    constructor(){
        super(RTCPconfig)
    }

    onStreams(){
        ket.initVideos( this.localStream, this.remoteStream )
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
        peer.createAnswer(offer)
    }

    onIce(candidate){
        peer.addCandidate(candidate)
    }

    onAnswer(answer){
        peer.ready(answer)
        ket.setMessage('')
    }

    onHangup(data){
        ket.setMessage(data)
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


