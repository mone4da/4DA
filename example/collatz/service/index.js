const config = require('./config')

const decompose = require('./collatz')

class Source extends require('./prompt'){
	constructor(){
		super(config.prompt)

	}

	onGranted(data){
		console.log('generating ...')

		let frequency = config.collatz.frequency
		setInterval(() => {
				let min = config.collatz.min
				let max = config.collatz.max
				let n = Math.floor(min + Math.random()*max)
				decompose(n, point => this.broadcast(point))
		}, frequency)

	}

	onRegister(data){
		this.peers.indexOf(data.from) < 0 && this.peers.push(data.from)

		this.registered(data.from, config.collatz.max)
	}

	broadcast(point){
		for(let peer of this.peers){
			this.collatz(peer, point)
		}
	}

}


new Source()
