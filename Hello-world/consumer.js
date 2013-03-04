require('../setup').Init('Hello World.');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var q = connect.queue('hello');
    q.on('queueDeclareOk', function(args) {
        q.bind('#');
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                console.log(JSON.parse(message.data.toString()));
            });
        });
    });
});