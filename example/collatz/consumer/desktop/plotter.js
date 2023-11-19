export default class Plotter{
    constructor(canvas, limit){
        this.canvas = canvas

        this.context = canvas.getContext('2d');
        this.width = canvas.width
        this.height = canvas.height

        this.center = {x : this.width / 2, y: this.height / 2}
        this.scale = {x: this.width / limit.x, y: this.height/limit.y}

    }

    add(x, y){
        this.plot(x,y)
    }
    
    plot(x, y){
        let cx = this.center.x + x * this.scale.x + 1
        let cy = this.height - (this.center.y + y* this.scale.y) - 2
        let h = .2
        let w = Math.ceil(this.scale.x)

       this.context.fillStyle = ' green'
        this.context.fillStyle = 'green'

        this.context.beginPath();
        this.context.ellipse(cx, cy, w , h, 0, 0, 2 * Math.PI)
        this.context.fill();
    }

    adjust(max){
        this.scale.x = this.width / max.m
        this.scale.y = this.height / max.p
    }
}