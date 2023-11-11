class LocalVideo{
  constructor(id, onStream){
    let video = document.getElementById(id)

    navigator
      .mediaDevices
      .getUserMedia({audio: false, video: true})
      .then(stream => {
        video.srcObject = stream
        this.stream = stream
          onStream(stream)
      })
  }
}

class RemoteVideo{
  constructor(id){
    let video = document.getElementById(id)

    let stream = new MediaStream()
    video.srcObject = stream

    console.log('remote video created')
  }

  start(tracks){
    for(let track of tracks){
      this.stream.addTrack(track)
    }
  }
}


export default class XKet{
    constructor(){
        this.localVideo = new LocalVideo('localVideo', stream => this.onStream(stream))

        document.getElementById('call').onclick = () => {
          this.onCall()
        }

        document.getElementById('answer').onclick = () => {
          this.onAnswer()
        }

        document.getElementById('hangup').onclick = () => {
          this.onHangup()
        }
    }

    getLocalStream(){
      return this.localVideo.stream
    }

    startRemoteVideo(tracks){
      if (!this.RemoteVideo){
        this.remoteVideo = new RemoteVideo('remoteVideo')
        this.RemoteVideo.start(tracks)
      }
    }

    call(data){
      console.log('call',data)
    }

    offer(data){
      this.offer = this.offer
      console.log('offer', data)
    }

    answer(data){
      console.log('answer', data)
    }

    ice(data){
      console.log('ice', data)
    }

    hangup(data){
      console.log('hangup', data)
    }

    onCall(){}
    onHangup(){}
    onAnswer(){}
    onStream(_){}
}