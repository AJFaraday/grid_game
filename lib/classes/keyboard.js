GridGame.classes.keyboard = function() {

  this.init = function() {
    var keyboard = this;
    this.key_map = {};
    $.each(
      GridGame.players,
      function(i, player) {
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
    );
    this.set_key_event();
  };

  this.set_key_event = function() {
    var keyboard = this;
    $('body').off('keydown');
    $('body').on(
      'keydown',
      function(e) {
        var command = keyboard.key_map[e.keyCode];
        if (command) {
          e.preventDefault();
          command.player.change_direction(command.direction);
        }
      }
    );
  };

};
