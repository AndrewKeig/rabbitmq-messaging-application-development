//require('../setup').Init('Down the rabbit hole.');
var connection = require('amqp').createConnection();

connection.on('ready', function() {
    var exchange = connection.exchange('hello.world.exchange', {type: 'direct'});
    var queue = connection.queue('hello.world.queue');

    queue.on('queueDeclareOk', function(args) {
        queue.bind(exchange, 'hello.key');

        queue.subscribe(function(message) {
            console.log(JSON.parse(message.data.toString()
            ));
        });
    });
});