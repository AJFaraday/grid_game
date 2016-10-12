GridGame.data.players = [
  {
    name: 'green',
    start: GridGame.positions.north_west_corner(2),
    direction: 'east',
    playable: true
  },
  {
    name: 'red',
    start: GridGame.positions.south_east_corner(2),
    direction: 'west',
    playable: true
  }
  /*
  ,
  {
    name: 'yellow',
    start: {
      x: 8,
      y: 0
    },
    direction: 'south',
    playable: false
  },
  {
    name: 'blue',
    start: {
      x: 11,
      y: 11
    },
    direction: 'north',
    playable: false
  }
  */
];
