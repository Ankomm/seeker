var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');
var SteamStore = require('steam-store');
var JSONStream = require('JSONStream');
var file = require('file-system');
var fs = require('fs');
var jsonfile = require('jsonfile');
var date = require('date-and-time');
var throttledQueue = require('throttled-queue');

var jsonArray = [];
var idsArray = [];
var key = '';
var throttle = throttledQueue(1, 1600);

var now = new Date();
date.locale('fr');
var aaa = date.format(now, 'HH:mm');

var allProducts = '';

var i = 0;

var store = new SteamStore({

	country: 'FR',
	language: 'fr'
});

request('http://api.steampowered.com/ISteamApps/GetAppList/v2/?format=json', function(error, response, body) {

	if(error) throw error;

	var JSONbody = JSON.parse(body);

	JSONbody.applist.apps.forEach(function(elt) {

		if(!idsArray.includes(elt.appid)) {

			idsArray.push(elt.appid);

			throttle(function() {

				src = 'http://store.steampowered.com/api/appdetails/?appids=' + elt.appid + '&format=json';

				request(src, function(err, resp, bod) {

					i++;

					now = new Date();
					aaa = date.format(now, 'hh:mm');

					if(err) throw err;

					try {

						buddy = JSON.parse(bod);

						key = Object.keys(buddy)[0];						

						if(buddy[key].success) {

							if(buddy[key].data.type === 'game') {

								console.log(i + ' ::: ' + buddy[key].data.steam_appid + ' : ' + buddy[key].data.name + ' :: ' + aaa);

								jsonArray.push({appid: buddy[key].data.steam_appid, name: buddy[key].data.name, from: 'steam'});
							}
							else {

								console.log(i + ' ::: ' + key + ' : ------');
							}
						}
						else {

							console.log(i + ' ::: ' + key);
						}

						if(elt.appid === JSONbody.applist.apps[JSONbody.applist.apps.length - 1].appid) {

							jsonfile.writeFile('allgames.json', jsonArray , function(err) {});
						}
					}
					catch(e) {

						console.log(e);
						jsonfile.writeFile('allgames.json', jsonArray , function(err) {});
					}
				});
			});
		}
	});
});
/*
store.getProducts('game', true)
				 .on('data', function(product) {

				 	i++;

				 	allProducts += product;

				 	console.log(typeof product);

				 	if(i == 10) {

				 		console.log(allProducts);
				 	}

				 	console.log((i * 100.0) / 4281.0);

				 })
				 .on('end', function(){ setTimeout(function() {

				 	fs.writeFile('allgamessteamnonorder.txt', allProducts , (err) => { 

				 		if(err) throw err;
				 		console.log('FILE OKAY');
				 	 });

				 	allProducts.forEach(function(prod) {

				 		if(!idsArray.includes(prod.steam_appid)) {

				 			console.log(prod.steam_appid + ' : ' + prod.name);
				 			idsArray.push(prod.steam_appid);
				 			jsonfile.writeFile('allgames.json', {appid: prod.steam_appid, name: prod.name, from: 'steam'}, {flag: 'a'} , function(err) {});
					 	}
					 	else {

					 		console.log('DUPLICATA');
					 	}
				 	});
				 	
				 	console.log('END');
				 }, 10000)});*/