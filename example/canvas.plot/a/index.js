const config = require('./config')

class Bra extends require('./prompt'){
	constructor(ket){
		super(config.prompt)
		this.ket = ket
	}

	onPlot(data){
		this.ket.plot(data)
	}

	onReset(data){
		this.ket.reset(data)
	}
}

class Ket{
	constructor(socket){
		this.open(socket)
	}

	open(socket){
		this.bra = new Bra(this)

		this.socket = socket
		this.socket.on('plot', data => this.bra.sendPlot(data))
		this.socket.on('reset', data => this.bra.sendReset(data))
	}

	notify(id, data){
		this.socket && this.socket.emit(id, data)
	}

	close(){
		this.bra.close()
	}

	plot(data){
		this.notify('plot', data.detail)
	}

	reset(data){
		this.notify('reset', data.detail)
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
