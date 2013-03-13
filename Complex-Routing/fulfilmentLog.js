require('../setup').Init('Complex Routing Fulfilment Logger.');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('logging.exchange', {type: 'topic'});
    var q = connect.queue('fulfilment.logging.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('logging.exchange', 'Order.log.ERROR');
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                console.log(unescape(message.data));
            });
        });
    });
});