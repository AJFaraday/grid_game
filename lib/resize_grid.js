GridGame.resize = {

  initial_tile_size: 32,
  current_tile_size: 32,
  page_width: null,
  page_height: null,

  grid_fits_on_page: function () {
    this.page_width |= $(window).width();
    var grid_width = GridGame.width * this.current_tile_size;
    this.page_height = $(window).height();
    var grid_height = GridGame.height * this.current_tile_size;
    return (
      grid_width <= (this.page_width - 40) &&
      grid_height <= (this.page_height - 120)
    );
  },

  make_grid_fit: function () {
    while (!this.grid_fits_on_page()) {
      this.shrink_grid()
    }
  },

  shrink_grid: function () {
    this.current_tile_size = this.current_tile_size - 2;
    this.set_tile_size(this.current_tile_size);
  },

  set_tile_size: function (size) {
    var font_size = size - 10;
    if (font_size <= 6) {
      font_size = 6
    }
    var small_font_size = size - 22;
    if (small_font_size <= 2) {
      small_font_size = 2
    }
    $('td.tile')
      .css('width', size + 'px')
      .css('height', size + 'px')
      .css('font-size', font_size + 'px');
    $('td.tile_city small')
      .css('font-size', small_font_size + 'px');
  },

  reset_grid_size: function () {
    this.current_tile_size = this.initial_tile_size;
    this.set_tile_size(this.initial_tile_size);
  }

};
