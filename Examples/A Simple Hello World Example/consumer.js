var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
var helloWorld = [];

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);

    var exchange = connection.exchange('hello-world-exchange', {type: 'direct'});
    var queue = connection.queue('hello-world-queue');

	exchange.on('exchangeDeclare', function() {
		console.log('Declare hello-world-exchange' );
	});
	
	exchange.on('exchangeDeclareOk', function(args) {
		console.log('Declare Ok hello-world-exchange'+ JSON.stringify(args));
	});
	
	exchange.on('exchangeDeleteOk', function(args) {
		console.log('Delete Ok hello-world-exchange'+ JSON.stringify(args));
	});
	
    queue.on('queueDeclareOk', function(args) {
		console.log('queueDeclareOk');
        queue.bind(exchange, 'hello-key');

		//queue.subscribe({ack:false, prefetchCount: 1},function(msg) {
		//the above is the default
		//AMQP server only delivers a single message at a time. When you want the next message, call q.shift()
		//You can also use the prefetchCount option to increase the window of how many messages the server will send you before you need to ack (quality of service).
		//Setting prefetchCount to 0 will make that window unlimited.
		
        queue.subscribe({ack:true, prefetchCount: 1}, function(message) {
            setTimeout(function () {
                var encoded_payload = unescape(message.data);
                var payload = JSON.parse(encoded_payload);
                console.log(payload);
                queue.shift();
            }, 5000);
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