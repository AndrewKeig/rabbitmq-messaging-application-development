//require('../setup').Init('Reliable Messaging.');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('shop.exchange', {type: 'direct', durable:true, autoDelete:false});
    var q = connect.queue('shop.queue', {durable:true, autoDelete:false});
    q.on('queueDeclareOk', function(args) {
        q.bind('shop.exchange', 'order.key');
        q.on('queueBindOk', function() {
            q.subscribe({ack:true, prefetchCount: 1}, function(message) {
                var service = new orderService(unescape(message.data));
                service.ProcessOrder();
                q.shift();
                service.DisplayConfirmation();
            });
        });
    });
});