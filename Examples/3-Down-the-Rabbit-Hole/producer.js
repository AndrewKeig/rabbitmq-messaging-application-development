//source ~/.bashrc
//require('../setup').Init('Down the rabbit hole.');
var connect = require('amqp').createConnection();
var messages = [];
messages.push(' (\\-/)');
messages.push(" ('.')  –> hello world");
messages.push('(") (")');

connect.on('ready', function() {
    var ex = connect.exchange('hello.world.ex', {type: 'direct'});
    var q = connect.queue('hello.world.q');
    q.on('queueDeclareOk', function(args) {
        q.bind(ex, 'hello.key');
        q.on('queueBindOk', function() {
            messages.forEach(function(message) {
                var data = JSON.stringify(message);
                ex.publish('hello.key', data, {});
            });
        });
    });
});



