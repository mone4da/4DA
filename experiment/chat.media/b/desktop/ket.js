
export default class XKet{
    constructor(){
        this.localVideo = document.getElementById('localVideo')
        this.remoteVide = document.getElementById('remoteVideo')
    }

    initLocalVideo(stream){
        this.localVideo.srcObject = stream
    }

    initRemoteVideo(stream){
        this.remoteVide.srcObject = stream
    }

    initVideos(local, remote){
        this.initLocalVideo(local)
        this.initRemoteVideo(remote)
    }

}