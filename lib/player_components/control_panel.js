GridGame.player_components.control_panel = function() {
  
  this.init_control_panel = function() {
    if (this.playable) {
      this.panel = $('<div>');
      this.panel.addClass('player_panel');
      this.panel.addClass(this.css_class);

      this.add_button('north', 'N');
      this.add_button('west', 'W');
      this.add_button('south', 'S');
      this.add_button('east', 'E');

      GridGame.player_panels.append(this.panel);
    }
  };

  this.add_button = function(direction, character) {
    var btn = $('<div>');
    btn.addClass('btn');
    btn.addClass(direction);
    btn.html(character);

    var player = this;

    btn.on(
      'click',
      function() {
        player.change_direction(direction);
      }
    );

    this.panel.append(btn);
  };
  
  
  
};
