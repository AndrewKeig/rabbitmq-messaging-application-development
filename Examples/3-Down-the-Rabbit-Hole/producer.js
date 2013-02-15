//source ~/.bashrc
//require('../setup').Init('Down the rabbit hole.');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});

var messages = [];
messages.push(' (\\-/)');
messages.push(" ('.')  –> hello world");
messages.push('(") (")');

connection.on('ready', function() {
    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
        queue.bind(exchange, 'hello.key');
		queue.on('queueBindOk', function() {
            messages.forEach(function(data) {
                exchange.publish('hello.key', JSON.stringify(data), {});
			});
        });
    });
});



