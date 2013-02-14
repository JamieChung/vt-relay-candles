// var __proxy = 'requests/proxy.php?__url=http://www.vtrelaycandles.org';
var __proxy = window.location.host == 'localhost'  ? 'requests/proxy.php?__url=http://localhost:8000' : '';

// #
// Default route
TeamsListView = Backbone.View.extend({
	el: $('#team_table_body'),
	render: function(){
		var that = this;

		$(this.el).empty();
		$('#content').empty();
		$('#loadingImg').show();
		$('#team_name').text('Team Name');
		$('#pagesHeaderTxt').text('General Teams');
		$('#search-area, #sorterHeader, #forScroll, #pagesCheck').show();

		TeamsCollection.fetch({
			success: function(teams){
				$("#loadingImg").hide();

				$(that.el).html(
					_.template($('#teams-list-row-template').html(),
						{teams: teams.models}));

				info = _.toArray(teams.models);

				jQuery("#forScroll").mCustomScrollbar("update");
			}
		});
	}
});

// #/team/:id
//View for listing participants in a team
ParticipantsListView = Backbone.View.extend({
	el: $('#team_table_body'),
	render: function(id){
		var that = this;

		$(this.el).empty();
		$('#content').empty();
		$('#loadingImg').show();
		$('#team_name').text('Participant Name');
		$('#search-area, #sorterHeader, #forScroll, #pagesCheck').show();

		var t = new Team({id: id}).fetch({
			success: function(team){

				$('#pagesHeaderTxt').html(
					_.template($('#participants-title-template').html(), {
						team: team
					}));

				TeamParticipantsCollection.team_id = id;
				TeamParticipantsCollection.fetch({
					success: function(participants){
						$('#loadingImg').hide();

						$(that.el).html(
							_.template($('#participants-list-row-template').html(), {
								participants: participants.models
							}));
						info = _.toArray(participants.models);
						    jQuery("#forScroll").mCustomScrollbar("update");
					}
				});
			}
		});
	}
});

// #/participant/:id
// View of a single participant
ParticipantSingleView = Backbone.View.extend({
	el: $('#content'),
	render: function(id){
		var that = this;
		var P = new Participant({id: id});
		$('#search-area, #sorterHeader, #forScroll, #pagesCheck').hide();
		P.fetch({
			success: function(participant){

				$('#loadingImg').hide();

				vars = {
					id: id,
					participant: participant
				};

				$('#pagesHeaderTxt').html(
					_.template($('#participant-title-template').html(), vars));

				$(that.el).html(
					_.template($('#participant-single-template').html(), vars));
			}
		});

	}
});


Participant = Backbone.Model.extend({
	url: function(){
		return __proxy + '/participants/specific/' + this.id + '/';
	}
});

Team = Backbone.Model.extend({
	url: function(){
		return __proxy + '/teams/candles/' + this.id + '/';
	}
});

Teams = Backbone.Collection.extend({
	url: __proxy + '/teams/candles/all/',
	model: Team
});


TeamParticipants = Backbone.Collection.extend({
	url: function(){
		return __proxy + '/team/specific/candles/' + this.team_id + '/';
	},
	team_id: 0,
	model: Participant
});


var TeamsCollection = new Teams();
var TeamParticipantsCollection = new TeamParticipants();

var AppRouter = Backbone.Router.extend({
	routes: {
		// 'participants': 'getParticipants',
		'participant/:id': 'getParticipant',
		'team/:id': 'getParticipants',
		'teams': 'getTeams',
		'*actions': 'defaultRoute'
	}
});

var app_router = new AppRouter();

app_router.on('route:getParticipant', function(id){
	var participant_single_view = new ParticipantSingleView();
	participant_single_view.render(id);
});

app_router.on('route:getParticipants', function(id){
	var participants_list_view = new ParticipantsListView();
	participants_list_view.render(id);
});

app_router.on('route:defaultRoute', function(){
	var teams_list_view = new TeamsListView();
	teams_list_view.render();
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();