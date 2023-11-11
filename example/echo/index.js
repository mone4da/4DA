const config = require('./config').app

class App extends require('./prompt'){
	constructor(){
		super(config)
	}

	onGranted(data){
		super.onGranted(data)
		this.echo(config.peers.echo, Date.now())
	}

	onEcho(data){
		console.log('from', data.from, data.detail)
		this.echo(data.from, data.detail)
	}
}

new App()
