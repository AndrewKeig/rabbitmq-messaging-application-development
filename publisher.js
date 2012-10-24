var amqp = require('amqp');
var connection = amqp.createConnection({ host: "localhost", port: 5672 });
var count = 1;

connection.on('ready', function () {
    connection.exchange("bunny_exchange", options={type:'fanout'}, function(exchange) {

        var sendMessage = function(exchange, payload) {
            console.log('about to publish to bunny')
            var encoded_payload = JSON.stringify(payload);
            exchange.publish('', encoded_payload, {})
        }

        setInterval( function() {
            var test_message = 'bunny test '+ count
            sendMessage(exchange, test_message)
            count += 1;
        }, 10)
    })
})