Brackets = {
  init: function(results) {
    if(typeof results == 'undefined') {
      results = [];
    }
    var teams = [];
    $.each(
      Brackets.teams,
      function(idx, team_data) {
        var match_index = Math.floor(idx / 2);
        var team_index = idx % 2;
        // set team
        if(typeof teams[match_index] == 'undefined') {
          teams[match_index] = [];
        }
        teams[match_index][team_index] = team_data.name;
      }
    );

    $('#tournament_brackets').bracket({
      save: function() {},
      init: {
        teams: teams,
        results: results
      },
      disableToolbar: true,
      disableTeamEdit: true,
      teamWidth: 150
    });

    Brackets.init_team_display();
  },
  init_team_display: function() {
    var select_options = [];
    $.each(
      Brackets.teams,
      function(idx, team) {
        select_options.push(
          $('<option>')
            .html(team.name)
            .attr('value', team.gist)
        );
      }
    );
    $.each(
      ['green', 'red'],
      function(idx, area) {
        area = $('.team_display#' + area);
        var select = $('<select>');
        $.each(
          select_options,
          function(idx, option) {
            select.append(option.clone());
          }
        );
        select.on(
          'change',
          Brackets.show_team
        );
        area.append(select);
      }
    )
  },
  show_team: function(e, x) {
    var team_data = Brackets.get_team_data($(this).val());
    console.log(team_data);
  },
  get_team_data: function(gist) {
    return $.grep(
      Brackets.teams,
      function(team) {
        return team.gist == gist;
      }
    )[0];
  }
};