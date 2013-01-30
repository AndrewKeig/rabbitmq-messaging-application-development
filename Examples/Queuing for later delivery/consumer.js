var Shop = require('./shop');
var amqp = require('amqp');
var options = { host: "localhost", port: 5672 };
var connection = amqp.createConnection(options);

connection.on('ready', function () {
    connection.exchange("direct_e_exchange", options={type:'direct'}, function(exchange) {
        connection.queue("direct_e_queue", function(queue){
            queue.bind(exchange, '');
            queue.subscribe(function (message) {
                var order = unescape(message.data)
                var processor = new Shop.OrderProcessor(order);
                processor.Execute();
                console.log(order);
            })
        })
    })
})