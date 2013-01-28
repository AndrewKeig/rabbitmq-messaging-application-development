var readline = require('readline');
var connection = require('amqp').createConnection({url: "amqp://guest:guest@localhost:5672"});
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

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
        console.log('Opened hello-world-queue' + JSON.stringify(args));
        queue.bind(exchange, 'hello-key');

		queue.on('queueBindOk', function() {
		console.log('Bound hello-world-queue');
			
			rl.on('line', function (cmd) {
				console.log('Adding %s to queue.', cmd);
				var encoded_payload = JSON.stringify(cmd);
				exchange.publish('hello-key', encoded_payload, {});
			});
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