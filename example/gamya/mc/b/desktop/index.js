import state from "./state.js"
import {FarmerKet, ChickenKet} from "./ket.js"
import XBra from "./bra.js"

class Ket extends FarmerKet{
    constructor(){
        super(state)
    }

    onMove(data){
        bra.sendMove(data)
    }

    onShoot(data){
        bra.sendShoot(data)
    }
}

class Bra extends XBra{
    constructor(){
        super()
    }

    onMove(data){
        let player = state.peer[data.id]
        if (player){
            player.position.x = data.position.x
            player.position.y = data.position.y
            
            ket.updatePeers(state.peer)
        }
    }

    onShoot(data){
        ket.shoot(data)
    }
}


let bra = new Bra()
let ket = new Ket()
