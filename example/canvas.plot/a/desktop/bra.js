export default class XBra{
    constructor(){
        this.socket = io()

        this.socket.on('plot', data => this.onPlot(data))
        this.socket.on('reset', data => this.onReset(data))
        
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    onPlot(_){}
    onReset(_){}

    sendPlot(data){
        this.send('plot', data)
    }

    sendReset(data){
        this.send('reset', data)
    }
}