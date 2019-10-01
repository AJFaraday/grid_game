GridGame.info = {

  get_all: function () {
    GridGame.info.display('cities', GridGame.info.count_cities());
    GridGame.info.display('walkers', GridGame.info.count_walkers());
    GridGame.info.display('overall', GridGame.info.get_overall_health());

  },

  display: function (role, scores) {
    $.each(
      scores,
      function (player, score) {
        $('td[data-role="' + role + '"].' + player).text(score);
      }
    )
  },

  count_cities: function () {
    var result = {red: 0, green: 0};
    GridGame.board.each_tile(function (tile) {
      if (tile.value > 0 && tile.city) {
        result[tile.player.name] += 1;
      }
    });
    return result;
  },

  count_walkers: function () {
    var result = {red: 0, green: 0};
    GridGame.board.each_tile(function (tile) {
      if (tile.value > 0 && !tile.city) {
        result[tile.player.name] += 1;
      }
    });
    return result;
  },

  get_overall_health: function () {
    var result = {red: 0, green: 0};
    GridGame.board.each_tile(function (tile) {
      if (tile.value > 0) {
        result[tile.player.name] += tile.value;
      }
    });
    return result;
  }

};