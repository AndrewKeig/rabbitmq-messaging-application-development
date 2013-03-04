require('../setup').Init('Producer Consumer.');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('complete.order.exchange', {type: 'direct', confirm:true});
    var q = connect.queue('complete.order.queue', {durable:true, autoDelete:false});
    q.on('queueDeclareOk', function(args) {
        q.bind('complete.order.exchange', 'complete.order.key');
        q.on('queueBindOk', function() {
            q.subscribe({ack:true}, function(message) {
                var service = new orderService(unescape(message.data));
                service.CompleteOrder();
                q.shift();
            });
        });
    });
});