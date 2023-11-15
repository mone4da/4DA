export default class XBra{
    constructor(){
        this.socket = io()

        this.socket.on('move', data => this.onMove(data))
        this.socket.on('shoot', data => this.onShoot(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    onMove(_){}
    onShoot(_){}

    sendMove(data){
        this.send('move', data)
    }

    sendShoot(data){
        this.send('shoot', data)
    }

}