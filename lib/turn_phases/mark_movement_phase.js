GridGame.turn_phases.mark_movement_phase = function () {

  this.mark_movement_phase = function () {

    if (this.player && this.value > 0 && !this.city) {
      this.move_unit();
    } else  if (this.player && this.city) {
      if(GridGame.spawning_turn()) {
        this.spawn_unit();
      }
    }
  };

  this.move_unit = function () {
    var move_target = this.move_target();
    if (this.player.can_step_onto(move_target)) {
      this.value_change -= this.value;
      this.player.mark_step_onto(move_target, this.value);
    }
  };

  this.spawn_unit = function() {
    var move_target = this.move_target();
    if (this.player.can_step_onto(move_target)) {
      this.player.mark_step_onto(move_target, 1);
    }
  };


};

