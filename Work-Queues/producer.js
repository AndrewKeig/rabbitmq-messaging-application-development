require('../setup').Init('Work Queues.');
var order = require('../Shop/order');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();
var orderId = 0;

connect.on('ready', function() {
    var ex = connect.exchange('shop.exchange', {type: 'direct'});
    var q = connect.queue('shop.queue');
    q.on('queueDeclareOk', function(args) {
        q.bind('shop.exchange', 'order.key');
        q.on('queueBindOk', function() {
            console.log("Place your order");
            setInterval(function(){
                var newOrder = new order(++orderId);
                var service = new orderService(newOrder);
                service.Checkout();
                ex.publish('order.key', JSON.stringify(newOrder));
                ex.close();
                q.close();
            }, 100);
        });
    });
});