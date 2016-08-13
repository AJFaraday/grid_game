GridGame.classes.player = function (config) {

  this.config = config;
  this.name = config.name;
  this.css_class = config.css_class;

  this.direction = config.direction;

  this.init = function () {
    this.build_first_city();
  };

  this.build_first_city = function () {
    var start_tile = GridGame.board.tile(
      this.config.start.x,
      this.config.start.y
    );
    start_tile.player = this;
    start_tile.value = 10;
    start_tile.city = true;
  };

  this.mark_step_onto = function (target, value) {
    if (this.can_step_onto(target)) {
      target.value_change += value;
      target.player = this;
      target.changed_player = true
    }
  };

  this.can_step_onto = function (target) {
    if (!target) {return false}
    var target_present = target;
    var target_unowned = !(target.player && target.value > 0);
    var target_belongs_to_me = (target.player == this);
    var target_is_city = target.city;
    var target_already_stepped_to = target.changed_player;
    return (
      target_present &&
      (target_unowned || target_belongs_to_me) &&
      !target_is_city &&
      !target_already_stepped_to
    )
  };

  this.go_random_direction = function() {
    var directions = ['north', 'south', 'east', 'west'];
    this.direction = directions[Math.floor(Math.random() * 4)]
    console.log(this.direction)
  }

};
