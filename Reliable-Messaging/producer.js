require('../setup').Init('Reliable-fault-tolerant-applications.');
var shop = require('./shop');
var readline = require('readline');
var connect = require('amqp').createConnection();

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

connect.on('ready', function() {
    var ex = connect.exchange('order.exchange', {type: 'direct'});
    var q = connect.queue('order.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('order.exchange', 'order.key');
        q.on('queueBindOk', function() {
            rl.on('line', function (orderId) {
                var order = new shop.Order(orderId);
                order.Place();
                ex.publish('queuing.for.later.delivery.key', JSON.stringify(order));
            });
        });
    });
});