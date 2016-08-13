GridGame.turn_phases.do_movement_phase = function () {

  this.do_movement_phase = function () {
    this.value += this.value_change;
    this.value_change = 0;
    this.changed_player = false;
  };
  
};

