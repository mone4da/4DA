import Plotter from './plotter.js'

const chart = document.getElementById('chart')
const limit = document.getElementById('limit')
const m = document.getElementById('m')
const p = document.getElementById('p')

let max = {m: 0, p: -1}

let socket = io()

socket.on('init', data => {
    let plotter = new Plotter(chart, {x: data.limit, y: 10})

    limit.innerText = data.limit/2 + ' - ' + data.limit

    socket.on('plot', point => {
        plotter.add(point.m, point.p)

        max.p = Math.max(point.p, max.p)
        max.m = Math.max(point.m, max.m)

        m.innerText = max.m
        p.innerText = max.p

        limit.innerText = data.limit/2 + ' - ' + max.m

        plotter.adjust(max)
    })

})
