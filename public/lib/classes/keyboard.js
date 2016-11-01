GridGame.classes.keyboard = function() {

  this.init = function() {
    var keyboard = this;
    this.key_map = {};
    $.each(
      GridGame.players,
      function(i, player) {
        if(
          (GridGame.mode == 'local' && player.config.playable) ||
          (GridGame.mode == 'web' && player.name == 'red') // #TODO from web socket
        ) {
          $.each(
            player.key_map,
            function(keycode, direction) {
              keyboard.key_map[keycode] = {
                player: player,
                direction: direction
              }
            }
          )
        }
      }
    );
    this.set_key_event();
  };

  this.set_key_event = function() {
    var keyboard = this;
    $('body')
      .off('keydown')
      .on('keydown', function(e) {
          var command = keyboard.key_map[e.keyCode];
          if(command) {
            e.preventDefault();
            command.player.change_direction(command.direction);
          }
        }
      );
  };

};
