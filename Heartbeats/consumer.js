require('../setup').Init('Heartbeats.');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();

connect.on('heartbeat', function() {
  console.log("INFO, Heartbeat");
  this.end();
});

connect.on('ready', function() {
    var ex = connect.exchange('shop.exchange', {type: 'direct', confirm:true});
    var q = connect.queue('shop.queue', {durable:true, autoDelete:false});
    q.on('queueDeclareOk', function(args) {
        q.bind('shop.exchange', 'order.key');
        q.on('queueBindOk', function() {
            q.subscribe({ack:true}, function(message) {
                var service = new orderService(unescape(message.data));
                service.ProcessOrder();
                q.shift();
                console.log('INFO, Remove order from queue.');
            });
        });
    });
});