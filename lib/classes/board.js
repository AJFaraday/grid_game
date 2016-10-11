GridGame.classes.board = function () {
  // Setup

  this.rows = [];

  this.init = function () {
    this.build_table();
    for (var y = 0; y < GridGame.height; y++) {
      this.build_row(y);
    }
  };

  this.build_table = function () {
    var table = $('<table>');
    table.addClass('game_board');
    GridGame.board_dom.append(table);
    GridGame.table = table;
  };

  this.build_row = function (y) {
    var board = this;
    var current_row = $('<tr>');
    current_row.addClass('row');
    var row = [];
    for (var x = 0; x < GridGame.width; x++) {
      var tile = this.build_tile(x, y);
      row.push(tile);
      current_row.append(tile.build());
    }
    this.rows.push(row);
    GridGame.table.append(current_row);
  };

  this.build_tile = function (x, y) {
    return new GridGame.classes.tile(x, y);
  };

  // Drawing

  this.draw = function () {
    var board = this;
    $.each(this.rows, function (row_index, row_tiles) {
      board.draw_row(row_tiles);
    });
  };

  this.draw_row = function (row_tiles) {
    var board = this;
    $.each(row_tiles, function (row_index, tile) {
        tile.draw();
    });
  };

  // Interface

  this.tile = function (x, y) {
    var row = this.rows[y];
    if (row) {
      return row[x];
    } else {
      return null;
    }
  };

  this.each_tile = function (func) {
    // Sometimes read from the bottom upwards
    //var reverse = (GridGame.turn_number % 3 == 0);
    var reverse = (Math.random() * 2) >= 1;

    if (reverse) {
      for (i = this.rows.length; i >= 0 ; --i) {
        $.each(this.rows[i], function (x, tile) {
          func.call(null, tile);
        })
      }
    } else{
      $.each(this.rows, function (y, row) {
        $.each(row, function (x, tile) {
          func.call(null, tile);
        })
      });
    }

  };

  this.place_random_rock = function() {
    var x = Math.floor(Math.random() * GridGame.width);
    var y = Math.floor(Math.random() * GridGame.height);
    var tile = this.tile(x, y);
    if (tile.city || tile.rock) {
      this.place_random_rock();
      return false;
    } else {
      tile.rock = true;
    }
  };

};

