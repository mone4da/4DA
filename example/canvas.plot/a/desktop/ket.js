export default class XKet{
    constructor(){
      this.size = 10
      let color = 'red'
      this.canvas = document.getElementById('canvas')
      
      document.getElementById('reset').onclick = () => {
        console.log('reset')
        this.reset()
        
        this.onReset()
      }

      let plotting = false
      this.canvas.onmousedown = () => {
          plotting = true
          this.canvas.style.cursor = 'grabbing'
      }

      this.canvas.onmouseup = () => {
        plotting = false
        this.canvas.style.cursor = 'default'
    }

      this.canvas.onmousemove = event => {
        if (plotting){
          let r = this.canvas.getBoundingClientRect()
          let x = event.clientX - r.x
          let y = event.clientY - r.y
          this.addPlot({x,y, color})

          this.onPlot({x,y, color})
        }
      }

    }

    onPlot(data){}
    onReset(data){}

    addPlot(p){
      this.canvas.innerHTML += `<circle cx="${p.x}" cy="${p.y}" r="${this.size}" stroke="${p.color}" stroke-width="3" fill="${p.color}" />`
    }

    reset(data){
      this.canvas.innerHTML = ''
    }
}