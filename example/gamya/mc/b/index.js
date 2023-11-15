const config = require('./config')

class Bra extends require('./prompt'){
	constructor(ket){
		super(config.prompt)
		this.ket = ket
	}

	onMove(data){
		this.ket.move(data)
	}

	onShoot(data){
		this.ket.shoot(data)
	}

}

class Ket{
	constructor(socket){
		this.open(socket)
	}

	open(socket){
		this.bra = new Bra(this)

		this.socket = socket

		this.socket.on('move', data => this.bra.move(data))
		this.socket.on('shoot', data => this.bra.shoot(data))
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	move(data){
		console.log('mve', data.detail)
		this.notify('move', data.detail)
	}

	shoot(data){
		this.notify('shoot', data.detail)
	}


	close(){
		this.bra.close()
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
