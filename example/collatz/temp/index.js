const decomposite = require('./collatz')
const config = {
    port: 44441,
    home: './public'
}

class Session{
    constructor(socket){
        let limit = 99000001
        socket.emit('init', {limit: 3*limit+1})

        setTimeout(() => {
            this.generator = setInterval(() => {
                let n = Math.floor(limit + Math.random()*limit)
                decomposite(n, point => socket.emit('plot', point))   
            }, 100)
        }, 5000)
    }

    close(){
        clearInterval(this.generator)
    }
}

class App extends require('./desk'){
    constructor(){
        super(config)
    }

    onListening(){
        console.log('on', config.port)
    }

    createSession(socket){
        return new Session(socket)
    }
}

new App()