
var options = { 
  host: 'localhost'
, port: 5672
, login: 'guest'
, password: 'guest'
, vhost: '/'
};

options.heartbeat = 60;
options.reconnect = true;
options.reconnectBackoffStrategy ='exponential';
options.reconnectBackoffTime= 500;

var connect = require('amqp').createConnection(options);

connect.on('ready', function() {
    Subscribe(connect, 'my1.','my1.key', function(message) {
        console.log(message);
    });
});


connect.on("close", function(er) {
  console.log("close 1", er);
 // this.end();
});


connect.on("heartbeat", function() {
  console.log("heartbeat 1");
 // this.end();

});

connect.on("error", function(er) {
  console.log("er 1", er);
 // this.end();
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