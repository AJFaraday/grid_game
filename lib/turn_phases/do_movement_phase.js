GridGame.turn_phases.do_movement_phase = function () {

  this.do_movement_phase = function () {
    this.value += this.value_change;
    if (!this.changed) {
      this.changed = (this.value_change != 0);
    }
    this.do_city_conversion();
    this.end_movement_phase();
  };

  this.do_city_conversion = function() {
    if (!this.city && this.value >= GridGame.city_conversion_size && this.player != null) {
      this.value = 10;
      this.city = true; 
    }
  };


  // Tidy up, ready for the next mark_movement_phase
  this.end_movement_phase = function() {
    this.value_change = 0;
    this.changed_player = false;
  }
  
};

