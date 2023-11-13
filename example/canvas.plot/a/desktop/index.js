import XKet from "./ket.js"
import XBra from "./bra.js"

class Ket extends XKet{
    constructor(){
        super()
    }

    onPlot(data){
        bra.sendPlot(data)
    }

    onReset(data){
        bra.sendReset(data)
    }
}

class Bra extends XBra{
    constructor(){
        super()
    }

    onPlot(data){
        ket.addPlot(data)
    }

    onReset(data){
        ket.reset(data)
    }
}

let ket = new Ket()
let bra = new Bra()