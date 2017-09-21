var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');
var SteamStore = require('steam-store');
var JSONStream = require('JSONStream');
var file = require('file-system');
var fs = require('fs');
var jsonfile = require('jsonfile');

var mongoArray = [];
var idsArray = [];


var store = new SteamStore({

	country: 'FR',
	language: 'fr'
});

store.getProducts('game', true)
				 .pipe(JSONStream.parse())
				 .on('data', function(product) {

				 	console.log(product.steam_appid + ' : ' + product.name);

				 	if(!idsArray.includes(product.steam_appid)) {

				 		idsArray.push(product.steam_appid);
				 		mongoArray.push({appid: product.steam_appid, name: product.name});

				 		jsonfile.writeFile('allgames.json', {appid: product.steam_appid, name: product.name}, {flag: 'a'} , function(err) {});
				 	}
				 	else {

				 		console.log('DUPLICATA');
				 	}
				 })
				 .on('end', function() {

				 	console.log('END');

					db.collection('gameslist').insert(mongoArray, null, function(error, results) {

						if(error) throw error;

						console.log('Doc insertion okay');
					});
				 });