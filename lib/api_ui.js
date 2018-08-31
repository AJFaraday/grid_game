GridGame.api_ui = {
  init: function() {
    $.each(
      GridGame.apis,
      function(i, api) {
        var space = $('<div>')
          .addClass('api_space')
          .addClass('api_' + i);
        api.sel = $('<select>').data('api-index', i).data('api', api);
        api.sel.on('change', function() {GridGame.api_ui.set_source(api)});
        $.each(
          GridGame.data.bots,
          function(name, gist) {
            api.sel.append(
              $('<option>')
                .attr('value', gist)
                .html(name)
            );
          }
        );
        space.append(api.sel);
        api.id_field = $('<input>').css('display', 'none');
        space.append(api.id_field);
        api.id_field.on('change', function() {GridGame.api_ui.set_source(api)});

        api.code_field = $('<textarea>').css('display', 'none').addClass('code_field');
        api.code_field.attr('rows', 20);
        space.append(api.code_field);
        api.code_field.on('change', function() {GridGame.api_ui.set_source(api)});
        $('#forms').append(space);
        GridGame.api_ui.set_source(api);
      }
    );

    this.init_button_actions();
  },

  set_source: function(api) {
    switch(api.sel.val()) {
      case 'code':
        api.code_field.show();
        api.id_field.hide();
        api.func = function() {eval(api.code_field.val())};
        api.player.playable = false;
        break;
      case 'bot_id':
        api.id_field.show();
        api.get_gist(api.id_field.val());
        api.player.playable = false;
        break;
      case 'manual':
        api.func = function() {};
        api.player.playable = true;
        break;
      default:
        api.get_gist(api.sel.val());
        api.id_field.hide();
        api.code_field.hide();
        api.player.playable = false;
    }
  },

  init_button_actions: function() {
    $('.button[data-action="start"]').on('click', function() {GridGame.start()});
    $('.button[data-action="stop"]').on('click', function() {GridGame.stop()});
    $('.button[data-action="reset"]').on('click', function() {GridGame.reset()});
  }
};
