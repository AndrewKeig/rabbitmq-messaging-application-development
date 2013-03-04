require('../setup').Init('Producer Consumer.');
var order = require('../Shop/order');
var orderService = require('./orderService');
var connect = require('amqp').createConnection();
var orderId = 0;

connect.on('ready', function() {
    var ex = connect.exchange('shop.exchange', {type: 'direct', confirm:true});
    var q = connect.queue('shop.queue', {durable:true, autoDelete:false});
    q.on('queueDeclareOk', function(args) {
        q.bind('shop.exchange', 'order.key');
        q.on('queueBindOk', function() {
            console.log("Place your order");
            //setInterval(function(){
                var newOrder = new order(++orderId);
                var service = new orderService(newOrder);
                service.ProcessOrder();
                publish = ex.publish('order.key', JSON.stringify(newOrder), {deliveryMode:2});
                publish.on('ack', function(){
                    //service.CompleteOrder();
                    var exc = connect.exchange('complete.order.exchange', {type: 'direct', confirm:true});
                    var qc = connect.queue('complete.order.queue', {durable:true, autoDelete:false});

                    console.log('0');
                    qc.on('queueDeclareOk', function(args) {
                        console.log('1');
                        qc.bind('complete.order.exchange', 'complete-order.key');
                        console.log('2');
                        qc.on('queueBindOk', function() {
                            console.log('3');
                            exc.publish('complete-order.key', JSON.stringify(orderId), {deliveryMode:2});
                        });
                    });
                });
            // }, 1000);
        });
    });
});