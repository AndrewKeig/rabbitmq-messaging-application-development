require('../setup').Init('Queuing for later delivery.');
var shop = require('./shop');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('queuing.for.later.delivery.exchange', {type: 'direct'});
    var queue = connection.queue('queuing.for.later.delivery.queue');

    queue.on('queueDeclareOk', function(args) {
        console.log('Queue Declare Ok queuing.for.later.delivery.queue');
        queue.bind('queuing.for.later.delivery.exchange', 'queuing.for.later.delivery.key');

        queue.subscribe(function(message) {
            var order = unescape(message.data)
            var processor = new shop.OrderProcessor(order);
            processor.Process();
        });
    });
});