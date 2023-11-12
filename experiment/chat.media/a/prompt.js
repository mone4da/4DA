const msg = require('./core/message')

class Prompt extends require('./core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = config.credentials.address
		this.greeting = config.greeting
		this.buddy = config.buddy

		this.connect(config.host)
	}

	close(){
		this.signoff(this.credentials)
		this.signedin = false

	}

	onCommand(data, valid, signal){
		switch(data.subject){
			case 'offer' : this.onOffer(data); break;
			case 'answer' : this.onAnswer(data); break;
			case 'ice' : this.onIce(data); break;
			case 'hangup' : this.onHangup(data); break;
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
	onOffer(_){}
	onAnswer(_){}
	onIce(_){}
	onHangup(){}

	//custom method
	sendOffer(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'offer',
			data
		))
	}

	sendAnswer(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'answer',
			data
		))
	}

	sendIce(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'ice',
			data
		))
	}

	sendHangup(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'hangup',
			data
		))
	}
}

module.exports = Prompt
