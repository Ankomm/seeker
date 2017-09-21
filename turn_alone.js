var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');
var SteamStore = require('steam-store');
var JSONStream = require('JSONStream');
var file = require('file-system');
var fs = require('fs');
var jsonfile = require('jsonfile');

var jsonArray = [];
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
				 		jsonArray.push({appid: product.steam_appid, name: product.name});
				 	}
				 	else {

				 		console.log('DUPLICATA');
				 	}
				 })
				 .on('end', function(){ setTimeout(function() {

				 	jsonfile.writeFile('allgames.json', jsonArray, {flag: 'a'} , function(err) {});
				 	console.log('END');
				 }, 10000)});