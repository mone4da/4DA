import XKet from "./ket.js"
import XBra from "./bra.js"

class Ket extends XKet{
    constructor(){
        super()
    }

    onText(data){
        bra.text(data)
    }
}

class Bra extends XBra{
    constructor(){
        super()
    }

    onText(data){
        ket.appendText(data)
    }
}

let ket = new Ket()
let bra = new Bra()