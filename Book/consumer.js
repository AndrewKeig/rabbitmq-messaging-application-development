
var connection = require('amqp').createConnection();

function sleep(milliseconds)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds);
}

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello-world-exchange', options={type:'direct'});
    var queue = connection.queue('hello-world-queue');

    queue.on('queueDeclareOk', function(args) {
        queue.bind(exchange,'');

        queue.subscribe({ack:true},function(msg) {
            console.log('Message received:');
            console.log(msg.count);
            sleep(5000);
            console.log('Message processed. Waiting for next message.');
            queue.shift();
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