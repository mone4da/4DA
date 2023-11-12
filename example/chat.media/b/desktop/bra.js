export default class XBra{
    constructor(){
        this.socket = io()

        this.socket.on('offer', data => this.onOffer(data))
        this.socket.on('answer', data => this.onAnswer(data))
        this.socket.on('ice', data => this.onIce(data))
        this.socket.on('hangup', data => this.onHangup(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    onOffer(_){}
    onAnswer(_){}
    onIce(_){}
    onHangup(_){}

    offer(data){
        this.send('offer', data)
    }

    answer(data){
        console.log('onAnswer ===>> create answer', answer)
        this.send('answer', data)
    }

    ice(data){
        this.send('ice', data)
    }

    hangup(){
        this.send('hangup', Date.now())
    }


}