var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var request = require('request');


var server = http.createServer(function(req, res) {

	res.writeHead(200);

	MongoClient.connect('mongodb://localhost/steamgames', function(error, db) {

		if(error) throw error;

		db.collection('gameslist').find().toArray(function(error, results) {

			if(error) throw error;

			console.log(results);

			//res.contentType('json');
			//res.send({data: results});
			//res.end();
		});
	});
});

server.listen(8080);