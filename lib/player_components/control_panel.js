GridGame.player_components.control_panel = function() {
  
  this.init_control_panel = function() {
    if (this.playable) {
      this.panel = $('<div>');
      this.panel.addClass('player_panel');
      this.panel.addClass(this.css_class);

      this.add_button('north');
      this.add_button('west');
      this.add_button('south');
      this.add_button('east');

      GridGame.player_panels.append(this.panel);
    }
  };

  this.add_button = function(direction) {
    var btn = $('<div>');
    btn.addClass('btn');
    btn.addClass(direction);
    
    
    btn.html(this.character_for(direction));

    var player = this;

    btn.on(
      'click',
      function() {
        player.change_direction(direction);
      }
    );

    this.panel.append(btn);
  };
  
  this.character_for = function(direction) {
    return GridGame.data.key_display[this.name][direction];
  }
  
};
