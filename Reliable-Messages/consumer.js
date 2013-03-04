require('../setup').Init('Reliable Messages.');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('shop.exchange', {type: 'direct'});
    var q = connect.queue('shop.queue', {durable:true});
    q.on('queueDeclareOk', function(args) {
        q.bind('shop.exchange', 'order.key');
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                var service = new orderService(unescape(message.data));
                service.ProcessOrder();
            });
        });
    });
});