GridGame.apis = [];
GridGame.classes.api = function (player, config) {
  GridGame.apis.push(this);
  this.player = player;

  this.get_named_bot = function (name) {
    var bot = GridGame.data.bots[name];
    if (bot === undefined) {
      console.log("No known bot named " + name);
    } else {
      this.get_gist(bot);
    }
  };


  this.func = function () {
  };

  this.get_gist = function (id) {
    var api = this;
    if (GridGame.gist_cache[id]) {
      api.implement_code(GridGame.gist_cache[id])
    } else {
      $.get(
        'https://api.github.com/gists/' + id,
        function (response) {
          var code = response.files['bot.js'].content;
          console.log(code);
          GridGame.gist_cache[id] = code;
          api.implement_code(code)
        }
      )
    }
  };
  this.implement_code = function (code) {
    var api = this;
    this.func = function () {
      eval(code)
    };
    this.code_field.val(code);
  };

  // This point onwards is the public API

  this.towardsX = function () {
    this.player.change_direction(config.towardsX);
  };
  this.east = this.towardsX;

  this.towardsY = function () {
    this.player.change_direction(config.towardsY);
  };
  this.north = this.towardsY;

  this.awayX = function () {
    this.player.change_direction(config.awayX);
  };
  this.west = this.awayX;

  this.awayY = function () {
    this.player.change_direction(config.awayY);
  };
  this.west = this.awayY;

  this.spawning_turn = function () {
    return GridGame.spawning_turn();
  };

  this.random_direction = function () {
    this.player.go_random_direction();
  };

  this.turn = function () {
    return GridGame.turn_number;
  };

  this.next_move = 0;
  this.wait = function(turns) {
    this.next_move = GridGame.turn_number + turns;
  }

};
