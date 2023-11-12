export default class XBra{
    constructor(){
        this.socket = io()

        this.socket.on('text', data => this.onText(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    onText(_){}

    text(data){
        this.send('text', data)
    }
}