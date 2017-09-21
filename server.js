var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');

var stringToReturn = '';

var server = http.createServer(function(req, res) {

	res.writeHead(200);

	MongoClient.connect('mongodb://localhost/steamgames', function(error, db) {

		if(error) throw error;

		db.collection('gameslist').find().toArray(function(error, results) {

			if(error) throw error;

			stringToReturn += '[';

			results.forEach(function(elt) {

				stringToReturn += JSON.stringify(elt) + ',';
			});

			stringToReturn = stringToReturn.substring(0, stringToReturn.length - 1);

			stringToReturn += ']';

			res.end(stringToReturn);
		});
	});
});

server.listen(8080);