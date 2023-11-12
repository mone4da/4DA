const msg = require('./core/message')

class Prompt extends require('./core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = config.credentials.address
		this.greeting = config.greeting

		this.connect(config.host)
	}

	onCommand(data, valid, signal){
		switch(data.subject){
			case 'echo' : this.onEcho(data); break;
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
	onEcho(_){}


	//custom method
	echo(to, data){
		this.send('data',msg.create(
			this.address,
			to,
			'echo',
			data
		))
	}
}

module.exports = Prompt
