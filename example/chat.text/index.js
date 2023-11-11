const config = require('./config')

class Bra extends require('./prompt'){
	constructor(){
		super(config.prompt)
	}

	text(data){
		super.text(data)
	}

	onText(data){
		ket.text(data)
	}
}

class Ket{
	constructor(){
	}

	open(socket){
		this.socket = socket
		this.socket.on('text', data => bra.text(data))

		bra.trySignin()
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		bra.close()
	}

	text(data){
		this.notify('text', data.detail)
	}

}

class Desk extends require('./core/desk'){
	constructor(){
		super(config.desk)
	}

	createSession(socket){
		return ket
	}
}

let ket = new Ket()
let bra = new Bra()
new Desk()
