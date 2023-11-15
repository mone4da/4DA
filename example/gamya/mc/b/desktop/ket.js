export default class XKet{
    constructor(state){
      this.maze = document.getElementById('maze')
      this.farmer = state.farmer

      let data = state.maze.data.split('\n')
                .map(line => line.split(' ')
                .map(v => parseInt(v)))

      let rowc = data.length
      let colc = data[0].length
      this.scale = {x: 100 / colc, y: 100/rowc }

      this.drawMaze( data )

      let farmer = state.farmer
      for( let id of Object.keys(farmer))
        this.move({id, position: farmer[id], type: 0})

      let chicken = state.chicken
        for( let id of Object.keys(chicken))
          this.move({id, position: chicken[id], type: 1})
    }

    wall(row, col, w){
      let x = col * this.scale.x
      let y = row * this.scale.y
      let width = this.scale.x
      let height = this.scale.y
      let color = w ? 'green' : 'white'
      return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
    }

    drawMaze(data){
      let html = data.map((row, colidx) => row.map((w, rowidx) => this.wall(rowidx,colidx,w) ). join('')).join()
      this.maze.innerHTML = html
    }

    onMove(data){}
    onShoot(data){}

    moveFarmer(data){
        let avatar = (col,row) => {
          let x = col * this.scale.x
          let y = row * this.scale.y
          let width = this.scale.x
          let height = this.scale.y
          let color = 'blue'

          return `<rect id="${data.id}" x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
        }

      let e = document.getElementById(data.id)
      e && e.remove()

      this.maze.innerHTML += avatar(data.position.x, data.position.y)
    }

    moveChicken(data){
        let avatar = (col,row) => {
          let x = col * this.scale.x
          let y = row * this.scale.y
          let width = this.scale.x
          let height = this.scale.y
          let color = 'red'

          return `<rect id="${data.id}" x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
        }

      let e = document.getElementById(data.id)
      e && e.remove()

      this.maze.innerHTML += avatar(data.position.x, data.position.y)
    }

    move(data){
      if (data.type === 0)
        this.moveFarmer(data)
     else
        this.moveChicken(data)
    }

     shoot(data){
     }
}