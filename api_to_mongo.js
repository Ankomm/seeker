var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');
var throttledQueue = require('throttled-queue');
var file = require('file-system');
var fs = require('fs');
var SteamStore = require('steam-store');
var mongoArray = [];
var reqAdress = '';
var gamesJson;
var game;
var items;
var i = 0;

var file = 'allgames.json';

let throttle = throttledQueue(30, 500);


MongoClient.connect('mongodb://localhost/steamgames', function(error, db) {

	if(error) {

		return funcCallback(error);
	}

	console.log('Connexion to DB okay');

	request({url: 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=A02EE4D0F03C51AD8FCBDF5935D08666&format=json', headers: {agent: false, pool: false}}, function(error, response, body) {

		i++;

		if(!error && response.statusCode == 200) {

			gamesJson = JSON.parse(body);
			research = gamesJson.applist.apps;

			research.forEach(function(app) {

				reqAdress = 'http://store.steampowered.com/api/appdetails?appids=' + app.appid;

				throttle(function() {

					request({url: reqAdress, headers: {agent: false, pool: false}}, function(err, resp, buddy) {

						if(!err && resp.statusCode == 200) {

							game = JSON.parse(buddy);
							console.log(game);

							for(var key in game.Items) {

								if(game.hasOwnProperty(key)) {

									console.log('GAME FOREACH');

									if(game.key.data.type == 'game') {

										mongoArray.push({appid: game.key.data.steam_appid, name: game.key.data.name});

										console.log('GAME');
									}
									break;
								}
							}
						}
						else if(err) {

							console.log(err);

						}
					});
				});
			});
		}

		else if(error) throw error;

		// db.collection('gameslist').insert(mongoArray, null, function(error, results) {

			// if(error) throw error;

			// console.log('Doc insertion okay');
		// });
	});
})
//