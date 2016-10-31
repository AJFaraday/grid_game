GridGame.player_components.direction_change = function() {

  this.change_direction = function(direction) {
    this.direction = direction;
  };
  
  this.go_random_direction = function() {
    var directions = ['north', 'south', 'east', 'west'];
    this.change_direction(directions[Math.floor(Math.random() * 4)]);
  }
  
};
