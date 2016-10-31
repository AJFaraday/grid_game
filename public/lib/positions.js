GridGame.positions = {
  north_west_corner: function (margin) {
    return {
      x: margin,
      y: margin
    }
  },
  north_east_corner: function (margin) {
    return {
      x: (GridGame.data.game.width - margin - 1),
      y: margin
    }
  },
  south_west_corner: function (margin) {
    return {
      x: margin,
      y: (GridGame.data.game.height - margin - 1)
    }
  },
  south_east_corner: function (margin) {
    return {
      x: (GridGame.data.game.width - margin - 1),
      y: (GridGame.data.game.height - margin - 1)
    }
  },
  center: function () {
    return {
      x: Math.floor(GridGame.data.game.width / 2),
      y: Math.floor(GridGame.data.game.height / 2)
    }
  }
};
