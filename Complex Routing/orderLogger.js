require('../setup').Init('Complex Routing Order Logger.');
var logging = require('./logging');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('logging.exchange', {type: 'topic'});
    var q = connect.queue('order.logging.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('logging.exchange', 'Order.log.ERROR');
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                console.log(unescape(message.data));
            });
        });
    });
});