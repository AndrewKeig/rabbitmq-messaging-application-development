//require('../setup').Init('Down the rabbit hole.');
var connect = require('amqp').createConnection();

connect.on('ready', function() {
    var ex = connect.exchange('hello.world.ex', {type: 'direct'});
    var q = connect.queue('hello.world.q');
    q.on('queueDeclareOk', function(args) {
        q.bind(ex, 'hello.key');
        q.subscribe(function(message) {
            console.log(JSON.parse(message.data.toString()));
        });
    });
});