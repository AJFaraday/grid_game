var GridGame = {


  // Initialise
  classes: {},
  data: {},
  turn_phases: {},
  player_components: {},
  resize: {},
  bot_actions: [],

  init: function (data) {
    if (typeof data != 'undefined') {
      GridGame.init_data = data;
      GridGame.data.game = Object.assign(GridGame.data.game, data);
      Players.init();
      GridGame.tournament = data.tournament;
    } else {
      GridGame.init_data = data;
      this.tournament = false;
    }

    this.width = GridGame.data.game.width;
    this.height = GridGame.data.game.height;
    this.turn_time = GridGame.data.game.turn_time;
    this.spawn_interval = GridGame.data.game.spawn_interval;

    this.city_conversion_size = GridGame.data.game.city_conversion_size;
    this.rock_count = GridGame.data.game.rock_count;
    this.wall_count = GridGame.data.game.wall_count;

    this.wall_health = GridGame.data.game.wall_health;
    this.game_space = $('#grid_game');

    this.turn_number = 0;

    this.init_dom();
    this.init_board();
    this.init_players();
    this.init_obstacles();
    this.init_keyboard();
    GridGame.board.draw();

    this.focus_board();

    GistCache.init();
    if(GridGame.tournament) {
      GridGame.info.get_all();
    }
  },

  focus_board: function () {
    this.game_space.focus();
  },

  init_dom: function () {
    this.player_panels = $('<div>');
    this.player_panels.attr('id', 'player_panels')
    this.game_space.append(this.player_panels);

    this.board_dom = $('<div>');
    this.board_dom.attr('id', 'board');
    this.game_space.append(this.board_dom);
  },

  init_players: function () {
    if (this.players === undefined) {
      this.players = [];
      $.each(
        GridGame.data.players,
        function (index, player_config) {
          if (this.players === undefined) {
            player = new GridGame.classes.player(player_config);
            GridGame.players.push(player);
          }
          player.init();
        }
      )
    } else {
      $.each(
        GridGame.players,
        function (i, player) {
          player.build_first_city();
          player.still_alive = true;
          player.dead = false;
        }
      )
    }
  },

  init_board: function () {
    this.board = new GridGame.classes.board();
    this.board.init();
  },

  init_keyboard: function () {
    this.keyboard = new GridGame.classes.keyboard();
    this.keyboard.init();
  },

  init_obstacles: function () {
    this.board.place_n_obstacles('rock', this.rock_count);
    this.board.place_n_obstacles('wall', this.wall_count);
  },

  // Operation

  start: function () {
    if (!self.process) {
      self.process = setInterval(this.turn, this.turn_time);
    }
  },

  stop: function () {
    if (self.process) {
      clearInterval(self.process);
      self.process = null;
    }
  },

  turn_active: false,

  turn: function () {
    $.each(GridGame.apis, function (i, api) {
      api.func()
    });
    GridGame.set_players_dead();

    GridGame.board.each_tile(function (tile) {
      tile.mark_damage_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.do_damage_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.mark_movement_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.do_movement_phase();
    });
    GridGame.board.draw();

    GridGame.check_players_alive();
    GridGame.turn_number += 1;
    $('span#turn').html(GridGame.turn_number);
    if (GridGame.tournament) {
      GridGame.info.get_all();
    }
  },

  spawning_turn: function () {
    return (this.turn_number % this.spawn_interval == 0);
  },

  // All are marked dead at the start of the turn
  // During mark_movement_phase, they are marked still_alive, if they have tiles.
  // At the end of the turn, kill off players who have no tiles.
  set_players_dead: function () {
    $.each(
      this.players,
      function (i, player) {
        player.still_alive = false;
      }
    )
  },

  check_players_alive: function () {
    $.each(
      this.players,
      function (i, player) {
        if (!player.still_alive) {
          player.dead = true;
        }
      }
    );
    if (this.living_players().length <= 1) {
      console.log('the game is over!');
      ga("send", "event", "game", "ended");
      ga('send', {hitType: 'event', eventCategory: 'game', eventAction: 'game length', eventValue: this.turn_number});
      GridGame.stop();
    }
    if (this.living_players().length <= 1) {
      var winner = this.living_players()[0].name;
      ga("send", "event", "game", (winner + "_won"));
    }
  },

  living_players: function () {
    var result = [];
    $.each(
      this.players,
      function (i, player) {
        if (!player.dead) {
          result.push(player)
        }
      }
    );
    return result;
  },

  end_game: function () {
    console.log('the game is over!');
    GridGame.stop();
  },

  reset: function () {
    this.stop();
    this.game_space.html('');
    this.init(GridGame.init_data);
  },
  gist_cache: {}
};

