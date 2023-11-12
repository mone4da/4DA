const config = require('./config')

class Bra extends require('./prompt'){
	constructor(ket){
		super(config.prompt)
		this.ket = ket
	}

	onText(data){
		this.ket.text(data)
	}
}

class Ket{
	constructor(socket){
		this.open(socket)
	}

	open(socket){
		this.bra = new Bra(this)

		this.socket = socket
		this.socket.on('text', data => this.bra.text(data))
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		this.bra.close()
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
		return new Ket(socket)
	}
}

new Desk()
