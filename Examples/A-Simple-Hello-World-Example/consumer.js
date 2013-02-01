var setup = require('../setup').Init('A Simple Hello World Example.');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
var util = require('util');

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
		console.log('Queue Declare Ok hello-world-queue' + util.inspect(args));
        queue.bind(exchange, 'hello.key');

        queue.subscribe(function(message) {
            console.log(JSON.parse(message.data));
        });
    });
});