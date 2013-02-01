var setup = require('../setup').Init('A Simple Hello World Example.');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
var helloWorld = ["Hello World", "Hola Mundo", "bonjour tout le monde", "Hallo Welt", "ciao mondo"];
var util = require('util');
var count = 1;

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
        console.log('Queue Declare Ok hello.world.queue' + util.inspect(args));
        queue.bind(exchange, 'hello.key');

		queue.on('queueBindOk', function() {
		    console.log('Bound hello.world.queue');


            //helloWorld.forEach(function(data) {
                setInterval(function () {
                    var data = 'hello ' + (count += 1000);
                    console.log('Adding %s to queue.', data);
                    exchange.publish('hello.key', JSON.stringify(data), {});
                },  count += 1000);
			//});
        });
    });
});



