class Ket{
    constructor(state){
      this.maze = document.getElementById('maze')
      this.player = state.player

      this.data = state.maze.data.split('\n')
                .map(line => line.split(' ')
                .map(v => parseInt(v)))

      this.rowc = this.data.length
      this.colc = this.data[0].length

      this.scale = {x: 100/this.colc , y: 100/this.rowc }

      this.drawMaze()
      this.updatePeers(state.peer)
      this.updatePlayer()
      this.onMove(this.player)

      this.control()
    }

    control(){
      let valid = (x,y) => {
        return    x >= 0 && x < this.colc
              &&  y >= 0 && y < this.rowc
              && !this.data[x][y]
      }

       window.onkeydown = event => {
        let delta = {x:0, y: 0}
        switch(event.key){
          case 'ArrowUp': delta.y = -1; break;
          case 'ArrowDown' : delta.y = 1; break;
          case 'ArrowLeft' : delta.x = -1; break;
          case 'ArrowRight' : delta.x = 1; break;
        }

        let x = this.player.position.x + delta.x
        let y = this.player.position.y + delta.y

        if (valid(x,y)){
          this.player.position.x = x
          this.player.position.y = y
          this.updatePlayer()

          this.onMove(this.player)
        }
       }
    }

    updatePlayer(){
       this.move(this.player)
    }

    updatePeers(peer){
      for( let id of Object.keys(peer))
        this.move({id, position: peer[id].position, color: peer[id].color})
    }

    wall(row, col, w){
      let x = col * this.scale.x
      let y = row * this.scale.y
      let width = this.scale.x
      let height = this.scale.y
      let color = w ? 'green' : 'white'
      return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
    }

    drawMaze(){
      let html = this.data.map((row, colidx) => row.map((w, rowidx) => this.wall(rowidx,colidx,w) ). join('')).join()
      this.maze.innerHTML = html
    }

    onMove(data){}
    onShoot(data){}

    move(data){
        let avatar = (col,row) => {
          let x = col * this.scale.x
          let y = row * this.scale.y
          let width = this.scale.x
          let height = this.scale.y
          let color = data.color

          return `<rect id="${data.id}" x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`
        }

      let e = document.getElementById(data.id)
      if (e){
        e.style.x = data.position.x * this.scale.x
        e.style.y = data.position.y * this.scale.y
      }else  
        this.maze.innerHTML += avatar(data.position.x, data.position.y)
    }
}

class FarmerKet extends Ket{
  constructor(state){
    super(state)
  }
}

class ChickenKet extends Ket{
  constructor(state){
    super(state)
  }

  shoot(data){
  }

}

export{
  FarmerKet,
  ChickenKet
}