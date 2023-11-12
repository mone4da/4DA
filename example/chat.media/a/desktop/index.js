import {Caller, Callee} from './lib/peer.js'
import XKet from "./ket.js"
import XBra from "./bra.js"

const RTCPconfig = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302', 
                'stun:stun1.l.google.com:19302', 
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302']
        }
    ]
}


let peer = null

class Ket extends XKet{
    constructor(){
        super()
    }

    answer(answer){
        super.answer(answer)
        peer.shareLocalStream(ket.getLocalStream())
    }

    createOffer(p){
        console.log('createOffer', p)
        peer = p
        peer.createOffer().then(offer => {
            bra.offer(offer)
        } )
    }

    onCall(){
        if (!peer){
            new Caller(RTCPconfig, (id, data) => {
                console.log('Caller:event', id, data)
                switch(id){
                    case 'initialized' : this.createOffer(data.source); break;
                    case 'tracks' : this.startRemoteVideo(data.tracks); break;
                    case 'ice' : bra.ice(data.candidate); break;
                }
            })
        }
    }

    onAnswer(){
        if (peer){
            peer.createAnswer(this.peerOffer).then(answer => {
                bra.answer(answer)
            })
        }
    }

    onHangup(){
        bra.hangup()
    }
}

class Bra extends XBra{
    constructor(){
        super()
    }

    onOffer(offer){
        if (!peer){
            peer = new Callee(RTCPconfig, (id, data) => {
                console.log('Callee:event', id, data)
                switch(id){
                    case 'initialized' : ket.offer(offer); break;
                    case 'tracks' : this.startRemoteVideo(data.tracks); break;
                    case 'ice' : bra.ice(data.candidate); break;
                }
            })
        }
    }

    onAnswer(data){
        console.log('Bra:onAnswer',  data)
        ket.answer(data)
    }

    onIce(data){
        peer && peer.addCandidate(data)
    }

    onHangup(data){
        ket.hangup(data)
    }
}

let ket = new Ket()
let bra = new Bra()