

var options = { 
  host: 'localhost'
, port: 5672
, login: 'guest'
, password: 'guest'
, vhost: '/'
};

options.heartbeat = 20;
options.reconnect = true;
options.reconnectBackoffStrategy ='exponential';
options.reconnectBackoffTime= 500;

var connect = require('amqp').createConnection(options);

var orderId = 0;

connect.on('ready', function() {	
  setInterval(function(){
      orderId++;
      Publish(connect, 'my1.', 'my1.key', 'publishing'+ orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      // Publish(connect, 'my.', 'my.key', 'publishing'+ ++orderId);
      console.log("pub:", orderId);
  }, 0);
});

connect.on("heartbeat", function() {
  console.log("heartbeat 2");
  //this.end();
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