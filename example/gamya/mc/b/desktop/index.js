import state from "./state.js"
import {
    Reception,
    FarmerArena, 
    ChickenArena,
    Signup, 
    Signin, 
    Recover} from "./ket/index.js"
import XBra from "./bra.js"

class Bra extends XBra{
    constructor(){
        super()
    }

    onMove(data){
        let player = state.peer[data.id]
        if (player){
            player.position.x = data.position.x
            player.position.y = data.position.y
            
            arena.updatePeers(state.peer)
        }
    }

    onShoot(data){
        arena.shoot(data)
    }
}

class Arena extends FarmerArena{
    constructor(){
        super(root, state)
    }

    onMove(data){
        bra.sendMove(data)
    }

    onShoot(data){
        bra.sendShoot(data)
    }
}

class SysSignin extends Signin{
    constructor(){
        super(root)
    }

    onRecover(data){
        this.hide()

        new SysRecover(data)
    }

    onSubmit(data){
        this.hide()

        bra = new Bra()
        arena = new Arena()
    }

    onBack(){
        this.hide()
        reception.show()
    }
}

class SysSignup extends Signup{
    constructor(){
        super(root)
    }

    onSubmit(data){
        
    }

    onError(){
        this.showError('password or username are not the same')
    }

    onBack(){
        this.hide()
        reception.show()
    }
}

class SysRecover extends Recover{
    constructor(data){
        super(root, data)
    }
    
    onSubmit(data){
        console.log('recover')
        this.hide()
        signin.show()
    }
}

class SysReception extends Reception{
    constructor(){
        super(root)
    }

    onSignin(){
        this.hide()

        if (signin)
            signin.show()
        else
            signin = new SysSignin()
    }

    onSignup(){
        this.hide()

        if (signup)
            signup.show()            
        else
            signup = new SysSignup()
    }
}

let root = document.getElementById('root')
let bra = null
let arena = null
let signup = null
let signin = null

//let bra = new Bra()

let reception = new SysReception()
