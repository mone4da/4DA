const config = require('./config')

class Prompt extends require('./prompt'){
	constructor(){
		super(config.prompt)

	}
}

class DeskSession{
	constructor(){
	}

	open(socket){
		socket.on('text', data => prompt.text(data))
		socket.on('offer', data => prompt.offer(data))
		socket.on('answer', data => prompt.answer())
		socket.on('ice', data => prompt.ice())
	}

	close(){
		prompt.close()
	}

}

class Desk extends require('./core/desk'){
	constructor(){
		super(config.desk)
	}

	createSession(socket){
		return session
	}
}

let session = new DeskSession()
let desk = new Desk()
let prompt = new Prompt()
