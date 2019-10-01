Brackets = {
  init: function () {
    var minimalData = {
      teams: [
        [
          {name: 'All Towards', gist: '808c86eb544d9efaf94a30efc91bdfaf'},
          {name: 'Rotate', gist: '6634a7f381bb679ee7c2d90d93588d66'}
        ], /* first matchup */
        [
          {name: 'Long Random', gist: 'b9a0fe99060d9be1fc617bb7262f57be'},
          {name: 'Faraday Cage', gist: 'd9eb9a70ad0dc0fb1885be0fce032adc'}
        ]  /* second matchup */
      ]
    };

    $('#tournament_brackets').bracket({
      init: minimalData,
      save: function (data) {
      },
      decorator: {
        render: Brackets.render_fn,
        edit: Brackets.edit_fn
      },
      teamWidth: 150
    });
  },
  render_fn: function (container, data, score, state) {
    if (data) {
      container.append(data.name);
    }
  },
  edit_fn: function (container, data, doneCb) {

  },

  get_match: function (idx) {
    var teams_data = $('#tournament_brackets').data().bracket.obj.data();

  }
};