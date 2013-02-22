require('../setup').Init('Reliable-fault-tolerant-applications.');
var shop = require('./shop');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('order.exchange', {type: 'direct'});
    var q = connect.queue('order.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('order.exchange', 'order.key');
        q.subscribe({ack:true}, function(message) {
            var order = unescape(message.data)
            var processor = new shop.OrderProcessor(order);
            processor.Process();
            q.shift();
        });
    });
});