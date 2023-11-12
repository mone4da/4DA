
export default class XKet{
    constructor(){
        this.localVideo = document.getElementById('localVideo')
        this.remoteVideo = document.getElementById('remoteVideo')
        
        this.bye = document.getElementById('bye')

    }

    initLocalVideo(stream){
        this.localVideo.srcObject = stream
    }

    initRemoteVideo(stream){
        this.remoteVideo.srcObject = stream
    }

    initVideos(local, remote){
        this.initLocalVideo(local)
        this.initRemoteVideo(remote)
    }

    showBye(text){
        this.bye.innerText = text
    }
}