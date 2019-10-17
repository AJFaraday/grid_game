Brackets = {
  init: function (results) {
    if (typeof results == 'undefined') {
      results = [];
    }
    var teams = [];
    $.each(
      Brackets.teams,
      function (idx, team_data) {
        var match_index = Math.floor(idx / 2);
        var team_index = idx % 2;
        // set team
        if (typeof teams[match_index] == 'undefined') {
          teams[match_index] = [];
        }
        teams[match_index][team_index] = team_data.name;
      }
    );

    $('#tournament_brackets').bracket({
      init: {
        teams: teams,
        results: results
      },
      teamWidth: 150
    });

    $('.match').on('click', Brackets.click_match);
  },
  click_match: function (e) {
    var teams = $(this).find('.team, .team_na').map(
      function () {
        return $(this).data('teamid');
      }
    );
    if (teams.length == 2) {
      teams = $.map(teams, function (team_idx) {
        return Brackets.teams[team_idx]
      });
      Brackets.display_match($(this), teams);
    }
  },
  display_match: function (match_dom, teams) {
    Brackets.show_team($('.team_display#green'), teams[0]);
    Brackets.show_team($('.team_display#red'), teams[1]);
    Brackets.setup_match(match_dom, teams);
  },

  show_team: function (container, team) {
    container.empty();
    container.append(
      $('<h2>')
        .html($('<a>')
          .html(team.name)
          .attr('href', 'https://gist.github.com/' + team.gist)
          .attr('target', '_blank'))
    );
    container.append($('<p>').html(team.description));
    var list = $('<ul>');
    $.each(
      team.notes,
      function (idx, note) {
        list.append($('<ul>').html(note));
      }
    );
    container.append(list);
  },
  setup_match: function (match_dom, teams) {
    var panel = $('#match_panel');
    panel.empty();

    var bracket_dom = match_dom.closest('.bracket');
    var round_dom = match_dom.closest('.round');
    var round_index = bracket_dom.children().index(round_dom);
    var match_index = round_dom.children().index(match_dom);

    var launch = $('<a class="button">Start Match</a>')
      .attr('href', ('tournament.html?green=' + teams[0].gist + '&red=' + teams[1].gist))
      .attr('target', '_blank');
    panel.append(launch);

    var green_win = $('<div class="button green">Green Wins</div>');
    green_win.on(
      'click',
      function () {
        Brackets.set_score(round_index, match_index, [1, 0]);
      }
    );
    panel.append(green_win);

    var red_win = $('<div class="button red">Red Wins</div>');
    red_win.on(
      'click',
      function () {
        Brackets.set_score(round_index, match_index, [0, 1]);
      }
    );
    panel.append(red_win);
  },

  // set_score(0,1, [1,0])
  set_score(tier, match, score) {
    var results = $('#tournament_brackets').data().bracket.obj.data().results;
    if (typeof results[0][tier] == 'undefined') {
      results[0][tier] = []
    }
    results[0][tier][match] = score;
    Brackets.init(results);
  }
};