GridGame.api_ui = {
  init: function () {
    $.each(
      GridGame.apis,
      function (i, api) {
        var space = $('<div>')
          .addClass('api_space')
          .addClass('api_' + i);
        api.sel = $('<select>').data('api-index', i).data('api', api);
        api.sel.on('change', function () {
          GridGame.api_ui.set_source(api)
        });
        $.each(
          GridGame.data.bots,
          function (name, gist) {
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
        api.id_field.on('change', function () {
          GridGame.api_ui.set_source(api)
        });

        GridGame.api_ui.init_code_field(api, space);
        $('#forms').append(space);
        GridGame.api_ui.set_source(api);
      }
    );

    this.init_button_actions();
  },

  init_code_field: function (api, space) {
    api.code_modal = $('<div class="modal ">');
    api.code_field = $('<textarea>').addClass('code_field');
    api.code_field.attr('rows', 30).attr('cols', 130);
    api.code_modal.append(api.code_field);

    var close_button = $('<div class="button">Use</div>');
    close_button.on('click', function () {
      GridGame.api_ui.close_modal((api))
    });
    api.code_modal.append(close_button);

    api.edit_button = $('<span class="button" style="width:100px; float:right;">Edit Code</span>');
    api.edit_button.on(
      'click', function () {
        GridGame.api_ui.open_modal(api);
      }
    );
    space.append(api.edit_button);
    $('.modal_background').append(api.code_modal);

    /*
    code_field.on('change', function () {
      GridGame.api_ui.set_source(api)
    });
    */
  },
  open_modal: function (api) {
    $('.modal_background')
      .show()
      .css('width', $(window).width() + 'px')
      .css('height', $(window).height() + 'px');
    api.code_modal.show();
  },
  close_modal: function (api) {
    api.implement_code(api.code_field.val());
    api.code_modal.hide();
    $('.modal_background').hide();
    api.sel.val('code')
  },

  set_source: function (api) {
    switch (api.sel.val()) {
      case 'code':
        api.edit_button.show();
        api.id_field.hide();
        api.func = function () {
          eval(api.code_field.val())
        };
        api.player.playable = false;
        break;
      case 'bot_id':
        api.id_field.show();
        api.get_gist(api.id_field.val());
        api.player.playable = false;
        api.edit_button.show();
        break;
      case 'manual':
        api.func = function () {
        };
        api.player.playable = true;
        api.edit_button.hide();
        break;
      default:
        api.get_gist(api.sel.val());
        api.id_field.hide();
        api.edit_button.show();
        api.player.playable = false;
    }
  },

  init_button_actions: function () {
    $('.button[data-action="start"]').on('click', function () {
      GridGame.start()
    });
    $('.button[data-action="stop"]').on('click', function () {
      GridGame.stop()
    });
    $('.button[data-action="reset"]').on('click', function () {
      GridGame.reset()
    });
  }
};
