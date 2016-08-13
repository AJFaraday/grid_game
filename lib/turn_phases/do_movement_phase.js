GridGame.turn_phases.do_movement_phase = function () {

  this.do_movement_phase = function () {
    this.value += this.value_change;
    this.do_city_conversion();
    this.end_movement_phase();
  };

  this.do_city_conversion = function() {
    if (!this.city && this.value >= GridGame.city_conversion_size) {
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

