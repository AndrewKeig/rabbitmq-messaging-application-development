var connection = require('amqp').createConnection();
var count = 0;

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello-world-exchange', options={type:'direct'});
    var queue = connection.queue('hello-world-queue');

    queue.on('queueDeclareOk', function(args) {
        console.log('Opened hello-world queue');
        queue.bind(exchange, '');

        queue.on('queueBindOk', function() {
            console.log('Bound hello-world queue');

            setInterval(function(){
                console.log('Publishing message #' + ++count);
                exchange.publish('routingKey', { count:count });
            }, 1000);
        });
    });
});

//http://hjzhao.blogspot.co.uk/2012/05/first-error-with-nodejs.html
process.on('SIGINT', function() {
    process.exit(1);
});

process.on('SIGTSTP', function() {
    process.exit(1);
});

process.on('SIGTERM', function(){
    process.exit(1);
});