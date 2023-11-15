import state from "./state.js"
import XKet from "./ket.js"
import XBra from "./bra.js"

class Ket extends XKet{
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
        ket.move(data)
    }

    onShoot(data){
        ket.shoot(data)
    }
}

let ket = new Ket()
let bra = new Bra()