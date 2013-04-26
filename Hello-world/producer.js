require('../setup').Init('Hello World.');
var connect = require('amqp').createConnection();
var messages = [];
messages.push(' (\\-/)');
messages.push(" ('.')  –> hello world");
messages.push('(") (")');

connect.on('ready', function() {
    var ex = connect.exchange();
    var q = connect.queue('hello');
    q.on('queueDeclareOk', function(args) {
        q.bind('#');
        q.on('queueBindOk', function() {
            messages.forEach(function(message) {
                var data = JSON.stringify(message);
                ex.publish('hello', data, {});
            });
        });
    });
});