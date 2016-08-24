GridGame.positions = {
  north_west_corner: {
    x: 2,
    y: 2
  },
  north_east_corner: {
    x: (GridGame.data.game.width - 3),
    y: 2
  },
  south_west_corner: {
    x: 2,
    y: (GridGame.data.game.height - 3)
  },
  south_east_corner: {
    x: (GridGame.data.game.width - 3),
    y: (GridGame.data.game.height - 3)
  },
  center: {
    x: Math.floor(GridGame.data.game.width / 2),
    y: Math.floor(GridGame.data.game.height / 2)
  }
};
