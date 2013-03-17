var connect = require('amqp').createConnection();
  
connect.on('ready', function() {
	Subscribe(connect, 'my.','my.key', function(message) {
		console.log(message);
	});
});

function Subscribe (connect, name, key, callback) {
    var ex = connect.exchange(name + "exchange");
    var q = connect.queue(name + "queue");
        q.on('queueDeclareOk', function(args) {
        q.bind(name + 'exchange', key);
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
                callback(message.data.toString());
            });
        });
    });
};