var connect = require('amqp').createConnection();

module.exports = function Logging() {
    this.Log = function (location, level, message) {    
        connect.on('ready', function() {
            var ex = connect.exchange('logging.exchange', {type: 'topic'});
            var q = connect.queue('logging.queue');
            q.on('queueDeclareOk', function(args) {
                q.bind('logging.exchange');
                q.on('queueBindOk', function() {                  
                    ex.publish(location + '.log.' + level, message);
                });
            });
        });
    };
};