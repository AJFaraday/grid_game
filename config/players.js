GridGame.data.players = [
  {
    name: 'green',
    start: GridGame.positions.north_west_corner(2),
    direction: 'east',
    playable: true,
    towardsX: 'east',
    towardsY: 'south',
    awayX: 'west',
    awayY: 'north'
  },
  {
    name: 'red',
    start: GridGame.positions.south_east_corner(2),
    direction: 'west',
    playable: true,
    towardsX: 'west',
    towardsY: 'north',
    awayX: 'east',
    awayY: 'south'
  }
  // Only 2 for API-driven game
];
