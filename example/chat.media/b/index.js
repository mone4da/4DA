const config = require('./config')

class Bra extends require('./prompt'){
	constructor(ket){
		super(config.prompt)

		this.ket = ket
	}

	onOffer(data){
		this.ket.offer(data)
	}

	onAnswer(data){
		console.log('Prompt:answer', data)
		this.ket.answer(data)
	}

	onIce(data){
		this.ket.ice(data)
	}

	onHangup(data){
		this.ket.hangup(data)
	}
}

class Ket{
	constructor(socket){
		this.open(socket)
	}

	open(socket){
		this.socket = socket
		this.socket.on('offer', data => this.bra.offer(data))
		this.socket.on('answer', data => this.bra.answer(data))
		this.socket.on('ice', data => this.bra.ice(data))
		this.socket.on('hangup', data => this.bra.hangup(data))

		this.bra = new Bra(this)
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		this.bra.close()
	}

	offer(data){
		this.notify('offer', data.detail)
	}

	answer(data){
		this.notify('answer', data.detail)
	}

	ice(data){
		this.notify('ice', data.detail)
	}

	hangup(data){
		this.notify('hangup', data.detail)
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
