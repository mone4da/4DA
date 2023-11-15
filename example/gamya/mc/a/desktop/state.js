let maze = {
    data: `1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0
1 0 1 0 1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 0
1 0 1 0 0 0 0 0 1 0 1 0 1 0 0 0 1 0 0 0
1 0 1 1 1 0 1 1 1 1 1 0 1 0 1 1 1 0 1 0
1 0 1 0 1 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0
1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 0 1 0 1 0
1 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0 1 0
1 0 1 1 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 1
1 0 0 0 1 0 1 0 0 0 1 0 1 0 1 0 1 0 0 0
1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 1 1 0
1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 0 0
1 1 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0
1 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 1 0 1 0
1 0 1 1 1 1 1 1 1 0 1 1 1 1 1 0 1 0 1 1
1 0 1 0 0 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0
1 0 1 0 1 1 1 1 1 1 1 0 1 0 1 0 1 1 1 0
1 0 1 0 1 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0
1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 1 1 0
1 0 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 0 0 0`
}

let peer = {
    'yyyyy!plusmedium!4digitalasset!com' : {color: 'red', position: {x: 1, y:19}}
}

const player = {id: 'xxxxx!plusmedium!4digitalasset!com', color: 'black', type:0, position : {x:1, y:19}}

export default {maze, peer, player}
