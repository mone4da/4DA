const config = require('./config')

class Bra extends require('./prompt'){
	constructor(ket){
		super(config.prompt)

		this.ket = ket
	}

	onOffer(data){
		this.ket.notifyOffer(data)
	}

	onAnswer(data){
		this.ket.notifyAnswer(data)
	}

	onIce(data){
		this.ket.notifyIce(data)
	}

	onHangup(data){
		this.ket.notifyHangup(data)
	}

	close(){
		this.sendHangup('bye')
		super.close()
	}
}

class Ket{
	constructor(socket){
		this.open(socket)
	}

	open(socket){
		this.socket = socket
		this.socket.on('offer', data => this.bra.sendOffer(data))
		this.socket.on('answer', data => this.bra.sendAnswer(data))
		this.socket.on('ice', data => this.bra.sendIce(data))
		this.socket.on('hangup', data => this.bra.sendHangup(data))

		this.bra = new Bra(this)
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		this.bra.close()
	}

	notifyOffer(data){
		console.log('onOffer', data)
		this.notify('offer', data.detail)
	}

	notifyAnswer(data){
		console.log('onAnswer', data)
		this.notify('answer', data.detail)
	}

	notifyIce(data){
		console.log('onIce', data)
		this.notify('ice', data.detail)
	}

	notifyHangup(data){
		console.log('onHangup', data)
		this.notify('hangup', data.detail)
	}


}

class Desk extends require('./core/desk'){
	constructor(){
		super(config.desk)
	}

	onListening(){
		console.log('on', config.desk.port)
	}

	createSession(socket){
		return new Ket(socket)
	}
}

new Desk()
