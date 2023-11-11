export default class XKet{
    constructor(){
        this.textin = document.getElementById('textin')

        let text = document.getElementById('textout')
        text.onkeyup = event => {
          (event.key === 'Enter') && 
          (text.value.trim() !== '') && 
          this.onText(text.value)
        }
    }

    onText(data){}

    appendText(data){
        this.textin.value += data + '\n'
     }
}