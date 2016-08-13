var GridGame = {

  // Initialise

  classes: {},
  data: {},
  turn_phases: {},

  init: function () {
    this.width = GridGame.data.game.width;
    this.height = GridGame.data.game.height;
    this.turn_time = GridGame.data.game.turn_time;
    this.spawn_interval = GridGame.data.game.spawn_interval;

    this.game_space = $('#game_space');
    this.turn_number = 0;

    this.init_board();
    this.init_players();
    GridGame.board.draw();
  },

  init_players: function () {
    this.players = [];
    $.each(
      GridGame.data.players,
      function (index, player_config) {
        player = new GridGame.classes.player(player_config);
        player.init();
        GridGame.players.push(player);
      }
    )
  },

  init_board: function () {
    this.board = new GridGame.classes.board();
    this.board.init();
  },

  // Operation

  start: function () {
    setInterval(this.turn, this.turn_time)
  },

  turn: function () {
    GridGame.board.each_tile(function(tile) {tile.mark_movement_phase()});
    GridGame.board.each_tile(function(tile) {tile.do_movement_phase()});
    GridGame.board.each_tile(function(tile) {tile.mark_damage_phase()});
    GridGame.board.each_tile(function(tile) {tile.cause_damage_phase()});
    GridGame.board.draw();
    GridGame.turn_number += 1;
  },

  spawning_turn: function () {
    return (this.turn_number % this.spawn_interval == 0);
  }
};

$(window).ready(function () {
  GridGame.init();
  GridGame.turn();
  GridGame.start();
});
