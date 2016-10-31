GridGame.turn_phases.mark_damage_phase = function() {

  this.mark_damage_phase = function() {
    if (this.player || this.wall) {
      var tile = this;
      $.each(
        this.neighbours(),
        function (index, neighbour) {
          tile.mark_damage_from_neighbour(neighbour)
        }
      )
    }
  };

  this.mark_damage_from_neighbour = function (neighbour) {
    if (!neighbour) {return false}
    if (!neighbour.player) {return false}
    var neighbour_belongs_to_enemy = (this.player == null || neighbour.player != this.player);
    var neighbour_is_alive = neighbour.value > 0;

    if (neighbour_belongs_to_enemy && neighbour_is_alive) {
      this.value_change -= neighbour.value;
    }
  };

};
