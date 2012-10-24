var amqp = require('amqp');
var connection = amqp.createConnection({ host: "localhost", port: 5672 });

connection.on('ready', function () {
    connection.exchange("bunny_exchange", options={type:'fanout'}, function(exchange) {
        // Recieve messages
        connection.queue("bunny_queue", function(queue){
            console.log('Created bunny queue')
            queue.bind(exchange, '');
            queue.subscribe(function (message) {
                console.log('subscribed to bunny queue')
                var encoded_payload = unescape(message.data)
                var payload = JSON.parse(encoded_payload)
                console.log('bunny subscriber two received a message:')
                console.log(payload)
            })
        })
    })
})