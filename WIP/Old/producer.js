var readline = require('readline');
var amqp = require('amqp');
var options = { host: "localhost", port: 5672 };
var connection = amqp.createConnection(options);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

connection.on('ready', function () {
    connection.exchange("direct_exchange", options={type:'direct'}, function(exchange) {
        rl.on('line', function (cmd) {
            console.log('Adding %s to queue.', cmd);
            var encoded_payload = JSON.stringify(cmd);
            exchange.publish('', encoded_payload, {})
        })
    })
});