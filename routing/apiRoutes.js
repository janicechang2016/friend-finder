var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
			res.json(friends);
		});

	app.post("/api/friends", function(req, res) {

		var userInfo = req.body;

		var userAnswers = userInfo.scores;

		//calculate the match
		var matchName = "";
		var matchPhoto = "";
		var totalDifference = 1000;

		//compare all existing friends in the friends.js friendsArray
		for (var i = 0; i < friends.length; i++) {

			//calculate the differences for each question
			var differences = 0;
			for (var j = 0; j < userAnswers.length; j++) {
				differences += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userAnswers[j]));
			}

			//show match
			if (differences < totalDifference) {

				totalDifference = differences;
				matchName = friends[i].name;
				matchPhoto = friends[i].photo;
			}
		}
		//add the new user
		friends.push(userInfo);

		res.json({status: 'OK', matchName: matchName, matchPhoto: matchPhoto});
			});
		};
