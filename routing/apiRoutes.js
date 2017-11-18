var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
			res.json(friends);
		});

	app.post("/api/friends", function(req, res) {

// 		var findMatch = {
// 			name: "",
// 			photo: "",
// 			friendDifference: 1000
// 		};

// 		var userData = req.body;
// 		// var userName = userData.name;
// 		// var userPhoto = userData.photo;
// 		// var userScores = userData.scores;

// 		var totalDifference = 0;

// 		//loop to get each survey taker's score
// 		for (var i = 0; i < friendsData.length - 1; i++) {
// 			console.log(friends[i].name);
// 			totalDifference = 0;

// 			//loop through that friends score and user's score
// 			for (var j = 0; j < 10; j++) {
// 				//calculate the difference between the scores and sum them into the totalDifference
// 				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
// 				//if the sum of differences is less then the differences of the most current match
// 				if (totalDifference <= bestMatch.friendDifference) {

// 					//change the bestMatch to be the new calculated friend
// 					bestMatch.name = friends[i].name;
// 					bestMatch.photo = friends[i].photo;
// 					bestMatch.friendDifference = totalDifference;
// 				}
// 			}
// 		}

// 		//save the user's data to the database
// 		friends.push(userData);

// 		//return a JSON with the user's bestMatch in the html page
// 		res.json(bestMatch);
// 	});
// };
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
