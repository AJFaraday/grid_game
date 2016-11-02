GridGame.classes.socket = function() {

  data = GridGame.data.socket;
  this.url = 'ws://' + data.server + ':' + data.socket + '/?config=' + data.config;

  this.init = function() {
    var grid_game_socket = this;
    this.socket = new WebSocket(this.url);
    this.socket.onmessage = function(e) {
      var data = JSON.parse(e.data);
      var func = grid_game_socket.api_methods[data.action];
      func(data, grid_game_socket);
    };
  };

  this.waiting_message = function(player) {
    return (
      "<h1>" +
      "You've joined the game as " +
      player +
      ", it'll start when the game is full." +
      "</h1>"
    )
  };

  this.send_direction = function(player, direction) {
    this.socket.send(
      JSON.stringify(
        {
          action: 'direction',
          player: player,
          direction: direction
        }
      )
    )
  };

  this.api_methods = {

    join: function(data, socket) {
      if(GridGame.active_player == null) {
        GridGame.active_player = data.player;
        $('#grid_game').html(socket.waiting_message(data.player));
      }
      if(data.status == 'start') {
        GridGame.draw_board();
        GridGame.start();
      }
    },

    leave: function(data, socket) {
      GridGame.clear_player(data.player);
    },

    win: function(data, socket) {
      GridGame.stop();
      GridGame.game_space.append(
        $('<h1>').html('Your opponent left! You win!')
      );
      GridGame.wipe_out_opponents();
    },

    direction: function(data, socket) {
      console.log(data);
      GridGame.player(data.player).change_direction(data.direction)
    },

    reload: function(data, socket) {
      location.reload();
    }

  }

};