require('../setup').Init('Queuing for later delivery.');
var shop = require('./shop');
var readline = require('readline');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);
    var exchange = connection.exchange('queuing.for.later.delivery.exchange', {type: 'direct'});
    var queue = connection.queue('queuing.for.later.delivery.queue');

    queue.on('queueDeclareOk', function(args) {
        console.log('Queue Declare Ok queuing.for.later.delivery.queue');
        queue.bind('queuing.for.later.delivery.exchange', 'queuing.for.later.delivery.key');

        queue.on('queueBindOk', function() {
            console.log('Queue Bind Ok queuing.for.later.delivery.queue');

            rl.on('line', function (orderId) {
                var order = new shop.Order(orderId);
                order.Place();

                //exchange.publish(routingKey, message, options, callback)
                //Publishes a message to the exchange. The routingKey argument is a string which helps routing in topic and direct exchanges.

                exchange.publish('queuing.for.later.delivery.key', JSON.stringify(order));
            });
        });
    });
});



