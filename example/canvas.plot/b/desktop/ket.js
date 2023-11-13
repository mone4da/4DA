export default class XKet{
    constructor(){
      this.size = 10
      this.canvas = document.getElementById('canvas')
      
      document.getElementById('reset').onclick = () => {
        console.log('reset')
        this.reset()
        
        this.onReset()
      }

      this.canvas.onmouseup = event => {
        let r = this.canvas.getBoundingClientRect()
        let x = event.clientX - r.x
        let y = event.clientY - r.y
        this.addPlot({x,y})

        this.onPlot({x,y})
      }

    }

    onPlot(data){}
    onReset(data){}

    addPlot(p){
      this.canvas.innerHTML += `<circle cx="${p.x}" cy="${p.y}" r="${this.size}" stroke="red" stroke-width="3" fill="red" />`
    }

    reset(data){
      this.canvas.innerHTML = ''
    }
}