export default class XKet{
    constructor(){
        this.textin = document.getElementById('textin')

        let text = document.getElementById('textout')
        text.onkeyup = event => {
          let data = text.value.trim()
          if ((event.key === 'Enter') && (data !== '')){
            this.onText(data)
            text.value = ''
          }
        }
    }

    onText(data){}

    appendText(data){
        this.textin.value += data + '\n'
     }
}