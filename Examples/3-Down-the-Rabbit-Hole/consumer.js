require('../setup').Init('Down the rabbit hole.');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
		console.log('Queue Declare Ok hello.world.queue');
        queue.bind(exchange, 'hello.key');

        queue.subscribe(function(message) {
            console.log(JSON.parse(message.data.toString()
            ));
        });
    });
});