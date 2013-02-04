require('../setup').Init('A Simple Hello World Example.');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});

var messages = [];
messages.push('(\\___/)(\\___/)(\\___/)(\\___/)(\\___/)');
messages.push("(=’.'=)(=’.'=)(=’.'=)(=’.'=)(=’.'=)       –> hello world");
messages.push('(")_(")(")_(")(")_(")(")_(")(")_(")');

var count = 1;

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);
    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
        console.log('Queue Declare Ok hello.world.queue');
        queue.bind(exchange, 'hello.key');

		queue.on('queueBindOk', function() {
		    console.log('Bound hello.world.queue');

            messages.forEach(function(data) {
                setTimeout(function () {
                    exchange.publish('hello.key', JSON.stringify(data), {});
                },  count += 1000);
			});
        });
    });
});



