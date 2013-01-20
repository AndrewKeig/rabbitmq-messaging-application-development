var amqp = require('amqp');
var options = { host: "localhost", port: 5672 };
var connection = amqp.createConnection(options);

connection.on('ready', function () {
    connection.exchange("direct_exchange", options={type:'direct'}, function(exchange) {
        connection.queue("direct_queue", function(queue){
            queue.bind(exchange, '');
            queue.subscribe(function (message) {
                var encoded_payload = unescape(message.data)
                var payload = JSON.parse(encoded_payload)
                console.log(payload)
            })
        })
    })
})