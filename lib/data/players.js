GridGame.data.players = [
  {
    name: 'green',
    css_class: 'green',
    start: {
      x: 2,
      y: 2
    },
    key_map: {
      87: 'north', // w
      65: 'west',  // a
      83: 'south', // s
      68: 'east'   // d
    },
    direction: 'east',
    playable: true
  },
  {
    name: 'red',
    css_class: 'red',
    start: {
      x: (GridGame.data.game.width - 3),
      y: (GridGame.data.game.height - 3)
    },
    key_map: {
      38: 'north', // up
      37: 'west',  // left
      40: 'south', // down
      39: 'east'   // right
    },
    direction: 'west',
    playable: true
  }
  /*
  ,
  {
    name: 'yellow',
    css_class: 'yellow',
    start: {
      x: 8,
      y: 0
    },
    direction: 'south',
    playable: false
  },
  {
    name: 'blue',
    css_class: 'blue',
    start: {
      x: 11,
      y: 11
    },
    direction: 'north',
    playable: false
  }
  */

];
