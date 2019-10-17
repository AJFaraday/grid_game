GridGame.turn_phases.mark_movement_phase = function() {

  this.mark_movement_phase = function() {
    if(this.player && this.value > 0 && !this.city) {
      this.move_unit();
    } else if(this.player && this.city) {
      if(GridGame.spawning_turn()) {
        this.spawn_unit();
      }
    }
    this.mark_player_still_alive();
  };

  this.move_unit = function() {
    var move_target = this.move_target();
    if (this.enemy_walker_at(move_target)) {
      this.fight_with(move_target);
    } else if (this.player.can_step_onto(move_target)) {
      this.value_change -= this.value;
      this.player.mark_step_onto(move_target, this.value);
    }
  };

  this.fight_with = function(target){
    console.log('little fight at turn ' + GridGame.turn_number);

    if (this.value_cahnge > 0) {
      console.log(this.value_change);
    }
    var target_value = (target.value + target.value_change);
    var this_value = (this.value + this.value_change);

    var win = (this_value) > target_value;
    var draw = this_value == target_value;
    var lose = this_value < target_value;
    if (win) {
      console.log(this.player.name + ' wins');
      this.value_change -= this_value;
      target.value_change -= target_value;
      target.value_change += (this_value - target_value);
      target.player = this.player;
      target.changed_player = true;
    } else if (draw) {
      console.log('drawn');
      this.value_change -= this_value;
      target.value_change -= target_value;
    } else if (lose) {
      console.log(target.player.name + ' wins');
      target.value_change -= this_value;
      this.value_change -= this_value;
    }
  };

  this.enemy_walker_at = function(target) {
    return (
      target &&
      target.player != this.player &&
      (target.value > 0 || (target.value + target.value_change) > 0) &&
        !target.city
    )
  };

  this.spawn_unit = function() {
    var move_target = this.move_target();
    if (this.enemy_walker_at(move_target)) {
      console.log('spawning on top of enemy')
      move_target.value_change -= 1;
      // TODO handle situation where walkers spawn on top of enemy walkers
      // this.fight_with(move_target);
    } else if(this.player.can_step_onto(move_target)) {
      this.player.mark_step_onto(move_target, 1);
    }
  };

  this.mark_player_still_alive = function() {
    if(this.player && this.value > 0) {
      this.player.still_alive = true
    }
  };

};

