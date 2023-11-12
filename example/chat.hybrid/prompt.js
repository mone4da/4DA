const msg = require('./core/message')

class Prompt extends require('./core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = config.credentials.address
		this.greeting = config.greeting
		this.buddy = config.peers.buddy

		this.connect(config.host)
	}

	close(){
		this.signoff(this.credentials)
	}

	onCommand(data, valid, signal){
		switch(data.subject){
			case 'text' : this.onText(data); break;
			case 'offer' : this.onOffer(data); break;
			case 'answer' : this.onAnswer(data); break;
			case 'ice' : this.onIce(data); break;
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
	onText(_){}
	onOffer(_){}
	onAnswer(_){}
	onIce(_){}


	//custom method
	text(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'text',
			data
		))
	}

	offer(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'offer',
			data
		))
	}

	answer(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'answer',
			data
		))
	}

	ice(data){
		this.send('data',msg.create(
			this.address,
			this.buddy,
			'ice',
			data
		))
	}

}

module.exports = Prompt
