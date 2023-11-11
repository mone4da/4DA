import {Caller, Callee} from './lib/peer.js'
import XKet from "./ket.js"
import XBra from "./bra.js"

let caller = null
let callee = null

class Ket extends XKet{
    constructor(){
        super()
    }

    createOffer(){
        this.caller.createOffer().then(offer => {
            bra.offer(offer)
        } )
    }

    onCall(){
        if (!caller){
            caller = new Caller((id, data) => {
                switch(id){
                    case 'initialized' : this.createOffer(); break;
                    case 'tracks' : this.startRemoteVideo(data.tracks); break;
                    case 'ice' : bra.ice(data.candidate); break;
                }
            })
        }
    }

    onAnswer(){
        if (callee){
            callee.createAnswer(this.offer).then(answer => {
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

    onOffer(data){
        if (!callee){
            this.callee = new Callee((id, data) => {
                switch(id){
                    case 'initialized' : ket.offer(data); break;
                    case 'tracks' : this.startRemoteVideo(data.tracks); break;
                    case 'ice' : bra.ice(data.candidate); break;
                }
            })
        }
    }

    onAnswer(data){
        ket.answer(data)
    }

    onIce(data){
        ket.ice(data)
    }

    onHangup(data){
        ket.hangup(data)
    }
}

let ket = new Ket()
let bra = new Bra()