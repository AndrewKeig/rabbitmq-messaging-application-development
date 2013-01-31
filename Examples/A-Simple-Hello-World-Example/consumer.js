var setup = require('../setup');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
setup.Init('A Simple Hello World Example.');
var helloWorld = [];

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
		console.log('queueDeclareOk');
        queue.bind(exchange, 'hello-key');

        queue.subscribe(function(message) {
            setTimeout(function () {
                //var encoded_payload = unescape(message.data);
                var payload = JSON.parse(message.data);
                console.log(payload);
            }, 5000);
        });
    });
});