const {v4 : uuid} = require('uuid')
const config = require('./config')

const decompose = require('./collatz')

class Prompt extends require('./prompt'){
	constructor(){
		super(config.prompt)
	}

	onGranted(data){
		console.log('registering ...')
		this.register()
	}

	onDenied(data){
		console.log('denied', data)
	}

	onCollatz(data){
		this.desk && this.desk.notify('plot', data.detail)
	}

	onRegistered(data){
		console.log('registered', data.detail)
		this.desk = new Desk(data.detail)
	}
}

class Session{
	constructor(socket, id){
		this.id = id
		this.socket = socket
	}

	close(){
		delete sessions[this.id]
	}

	notify(id, data){
		this.socket.emit(id, data)
	}
}

class Desk extends require('./core/desk'){
	constructor(init){
		super(config.desk)

		this.init = init

		this.sessions = {}
	}

	notify(id, data){
		for(let session of Object.values(this.sessions))
			session.notify(id, data)
	}

	createSession(socket){
		let session = new Session(socket, uuid())
		this.sessions[session.id] = session

		this.init && session.notify('init', this.init)

		return session
	}

	onCloseSession(session){
		delete this.sessions[session.id]
	}
}

new Prompt()
