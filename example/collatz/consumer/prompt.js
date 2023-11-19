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
			case 'collatz' : this.onCollatz(data); break;
			case 'registered': this.onRegistered(data); break;
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
	onCollatz(_){}
	onRegistered(_){}

	//custom method
	register(){
		this.send('data',msg.create(
			this.address,
			this.peers.attractor,
			'register',
			{}
		))
	}
}

module.exports = Prompt
