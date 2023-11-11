const http = require('http')
const xpr = require('express')
const socket = require('socket.io')

class Desk{
	constructor(config){
		let server = xpr()
		server.use(xpr.static(config.home))
		let app = http.createServer(server)

		this.dispatch(socket(app))

		app.listen(config.port, () => this.onListening())

	}

	dispatch(io){
		let session = this.createSession()

		io.on('connection', socket => {
			session.open(socket)

			socket.on('disconnect', () => session.close())
		})
	}

	onListening(){}
}

module.exports = Desk
