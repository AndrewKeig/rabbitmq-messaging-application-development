var setup = require('../setup');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
setup.Init('A Simple Hello World Example.');
var helloWorld = ["Hello World", "Hola Mundo", "bonjour tout le monde", "Hallo Welt", "ciao mondo"];

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello-world-exchange', {type: 'direct'});
    var queue = connection.queue('hello-world-queue');

	exchange.on('exchangeDeclare', function() {
		console.log('Declare hello-world-exchange' );
	});
	
	exchange.on('exchangeDeclareOk', function(args) {
		console.log('Declare Ok hello-world-exchange'+ JSON.stringify(args));
	});
	
	exchange.on('exchangeDeleteOk', function(args) {
		console.log('Delete Ok hello-world-exchange'+ JSON.stringify(args));
	});

    queue.on('queueDeclareOk', function(args) {
        console.log('Opened hello-world-queue' + JSON.stringify(args));
        queue.bind(exchange, 'hello-key');

		queue.on('queueBindOk', function() {
		    console.log('Bound hello-world-queue');

            helloWorld.forEach(function(letter) {
				console.log('Adding %s to queue.', letter);
				var encoded_payload = JSON.stringify(letter);
				exchange.publish('hello-key', encoded_payload, {});
			});
        });
    });
});



