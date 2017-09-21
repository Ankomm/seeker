var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');
var file = require('file-system');
var fs = require('fs');
var SteamStore = require('steam-store');
var jsonfile = require('jsonfile');
var mongoArray = [];
var reqAdress = '';
var gamesJson;
var game;
var items;
var i = 0;

var file = 'allgames.json';


MongoClient.connect('mongodb://localhost/steamgames', function(error, db) {

	if(error) {

		return funcCallback(error);
	}

	jsonfile.readFile(file, function(err, obj) {

		if(err) throw err;

		db.collection('gameslist').insert(obj, null, function(error, results) {

			if(error) throw error;

			console.log('Doc insertion okay');
		});
	});

	
});