var connect = require('amqp').createConnection();
var orderId = 0;

connect.on('ready', function() {	
	setInterval(function(){
	    Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
	}, 100);
});

function Publish (connect, name, key, message) {
    var ex = connect.exchange(name + "exchange");
    var q = connect.queue(name + "queue");
    q.on('queueDeclareOk', function(args) {
      q.bind(name + 'exchange', key);
      q.on('queueBindOk', function() {
        ex.publish(key, message);
        q.close();
        ex.close();
      });
    });

};