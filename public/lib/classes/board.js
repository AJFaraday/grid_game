GridGame.classes.board = function() {
  // Setup

  this.rows = [];

  this.init = function() {
    this.build_table();
    for(var y = 0; y < GridGame.height; y++) {
      this.build_row(y);
    }
    GridGame.resize.make_grid_fit();
  };

  this.build_table = function() {
    var table = $('<table>');
    table.addClass('game_board');
    GridGame.board_dom.append(table);
    GridGame.table = table;
  };

  this.build_row = function(y) {
    var board = this;
    var current_row = $('<tr>');
    current_row.addClass('row');
    var row = [];
    for(var x = 0; x < GridGame.width; x++) {
      var tile = this.build_tile(x, y);
      row.push(tile);
      current_row.append(tile.build());
    }
    this.rows.push(row);
    GridGame.table.append(current_row);
  };

  this.build_tile = function(x, y) {
    return new GridGame.classes.tile(x, y);
  };

  // Drawing

  this.draw = function() {
    var board = this;
    $.each(this.rows, function(row_index, row_tiles) {
      board.draw_row(row_tiles);
    });
  };

  this.draw_row = function(row_tiles) {
    var board = this;
    $.each(row_tiles, function(row_index, tile) {
      tile.draw();
    });
  };

  // Interface

  this.tile = function(x, y) {
    var row = this.rows[y];
    if(row) {
      return row[x];
    } else {
      return null;
    }
  };

  this.each_tile = function(func) {
    for(i = this.rows.length; i >= 0; --i) {
      $.each(this.rows[i], function(x, tile) {
        func.call(null, tile);
      })
    }
  };

  // TODO maybe move these two to an obstacle placing object
  this.place_n_obstacles = function(flag_name, number) {
    for(var i = number; i > 0; i--) {
      this.place_random_obstacle(flag_name);
    }
  };

  this.place_random_obstacle = function(flag_name) {
    var x = Math.floor(Math.random() * GridGame.width);
    var y = Math.floor(Math.random() * GridGame.height);
    var tile = this.tile(x, y);
    if(tile.city || tile.rock || tile.wall) {
      this.place_random_obstacle(flag_name);
    } else {
      tile[flag_name] = true;
      tile.value = GridGame[flag_name + '_health'];
    }
  };

};

