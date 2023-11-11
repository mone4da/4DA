const config = require('./config')

class Bra extends require('./prompt'){
	constructor(){
		super(config.prompt)
	}

	text(data){
		super.text(data)
	}

	onOffer(data){
		ket.offer(data)
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

class Ket{
	constructor(){
	}

	open(socket){
		this.socket = socket
		this.socket.on('offer', data => bra.offer(data))
		this.socket.on('answer', data => bra.answer(data))
		this.socket.on('ice', data => bra.ice(data))
		this.socket.on('hangup', data => bra.hangup(data))

		bra.trySignin()
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		bra.close()
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
		return ket
	}
}

let ket = new Ket()
let bra = new Bra()
new Desk()
