const msg = require('./core/message')

class Prompt extends require('./core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = config.credentials.address
		this.greeting = config.greeting
		this.peers = config.peers

		this.connect(config.host)
	}

	close(){
		this.signoff(this.credentials)
	}

	onCommand(data, valid, signal){
		switch(data.subject){
			case 'register' : this.onRegister(data); break;
		}
	}

	onError(data){
		console.log('error', data)
	}

	onConnected(data){
		console.log(this.greeting)
		this.signin(this.credentials)
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}

	//custom event
	onRegister(_){}

	//custom method
	collatz(peer, data){
		this.send('data',msg.create(
			this.address,
			peer,
			'collatz',
			data
		))
	}

	registered(peer, data){
		this.send('data',msg.create(
			this.address,
			peer,
			'registered',
			data
		))
	}

}

module.exports = Prompt
