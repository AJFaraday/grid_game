GridGame.turn_phases.do_damage_phase = function() {

  this.do_damage_phase = function() {
    this.value += this.value_change;
    if (!this.changed) {
      this.changed = (this.value_change != 0);
    }
    if (this.value <= 0) {this.kill()}
    this.value_change = 0;
  };
  
  this.kill = function() {
    this.player = null;
    this.value = 0;
    this.city = false;
    this.wall = false;
  };
  
};
