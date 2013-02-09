var __proxy = 'requests/proxy.php?__url=';

TeamsListView = Backbone.View.extend({
	el: $('#team_table_body'),
	render: function(){
		var that = this;

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


TeamParticipantsView = Backbone.View.extend({

	el: $('#content'),
	render: function(id){
		var that = this;

		TeamParticipantsCollection.team_id = id;
		TeamParticipantsCollection.fetch({
			success: function(participants){
				vars = {team_id : id, participants: participants.models};
				$(that.el).html(_.template($('#team-participants-template').html(), vars));
			}
		})
	}
});

ParticipantView = Backbone.View.extend({
	el: $('#content'),
	render: function(id){
		var that = this;
		var P = new Participant({id: id});
		P.fetch({
			success: function(participant){
				vars = {
					id: id,
					participant: participant
				};

				$(that.el).html(_.template($('#participant-template').html(), vars));
			}
		});

	}
});

ParticipantsView = Backbone.View.extend({
	el: $('#content'),
	render: function(){
		var that = this;

		ParticipantsCollection.fetch({
			success: function(participants){
				vars =  {
					participants: participants.models
				};
				$(that.el).html(_.template($('#participants-template').html(), vars));
			}
		});
	}
});

Participant = Backbone.Model.extend({
	url: function(){
		return __proxy + 'http://vtrelay.alwaysdata.net/participants/' + this.id + '/';
	}
});


Team = Backbone.Model.extend({

});

Teams = Backbone.Collection.extend({
	url: 'requests/teams.candles.all.json',
	model: Team
});


TeamParticipants = Backbone.Collection.extend({
	url: function(){
		return __proxy + 'http://vtrelay.alwaysdata.net/team/specific/candles/' + this.team_id + '/';
	},
	team_id: 0,
	model: Participant
});

Participants = Backbone.Collection.extend({
	url: function(){
		return __proxy + 'http://vtrelay.alwaysdata.net/participants/all/';
	},
	parse: function(response){
		var p = [];
		_.forEach(response, function(el, i){
			p.push({
				first_name: el.fields.fname,
				last_name: el.fields.lname,
				team_id: el.fields.team,
				id: el.pk
			});
		});

		return p;
	},
	model: Participant
});


var TeamsCollection = new Teams();
var TeamParticipantsCollection = new TeamParticipants();
var ParticipantsCollection = new Participants();

var AppRouter = Backbone.Router.extend({
	routes: {
		'participant/:id': 'getParticipant',
		'participants': 'getParticipants',
		'team/:id': 'getTeam',
		'teams': 'getTeams',
		'*actions': 'defaultRoute'
	}
});

// Backbone.emulateHTTP = true;
// Backbone.emulateJSON = true;

var app_router = new AppRouter;

app_router.on('route:getParticipant', function(id){
	$('#content').empty();
	var participant_view = new ParticipantView();
	participant_view.render(id);
});


app_router.on('route:getParticipants', function(){
	$('#content').empty();
	var participants_view = new ParticipantsView();
	participants_view.render();
});

app_router.on('route:getTeam', function(id){
	$('#content').empty();
	var team_participants_view = new TeamParticipantsView();
	team_participants_view.render(id);
});

app_router.on('route:defaultRoute', function(){
	var teams_list_view = new TeamsListView();
	teams_list_view.render();
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();