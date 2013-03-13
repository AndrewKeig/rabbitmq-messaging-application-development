require('../setup').Init('Complex Routing Operations Logger.');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('logging.exchange', {type: 'topic'});
    var q = connect.queue('operations.logging.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('logging.exchange', '*.log.*');
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                console.log(unescape(message.data));
            });
        });
    });
});