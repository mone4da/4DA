const config = require('./config').app

class App extends require('./prompt'){
	constructor(){
		super(config)

		this.last = Date.now()
	}

	onGranted(data){
		super.onGranted(data)
		this.echo(config.peers.echo, Date.now())
	}

	onEcho(data){

		console.log(data.detail, data.detail - this.last)
		this.echo(data.from, Date.now())

		this.last = data.detail
	}
}

new App()
