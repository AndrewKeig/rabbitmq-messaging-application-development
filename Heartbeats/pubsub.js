var amqp = require("amqp");
var PubSub = function() {
  if (!this instanceof PubSub) return new PubSub();
};

PubSub.prototype.Publish = function(name, message) {
  var connect = require('amqp').createConnection();
  connect.options['heartbeat'] = 2;
  connect.on('ready', function() {
    var ex = connect.exchange();
    var q = connect.queue(name);
    q.on('queueDeclareOk', function(args) {
      q.bind('#');
      q.on('queueBindOk', function() {           
        ex.publish(name, message, {});
      });
    });
  });
  connect.on('heartbeat', function() {
    console.log(" <- heartbeat");
    this.end();
  });
  connect.on('close', function() {
    console.log("closed");
    closed = true;
  });
  connect.on("error", function(err) {
    this.end();
    console.log(err);
  }); 
};

PubSub.prototype.Subscribe = function(name, callback) {
  var connect = require('amqp').createConnection();
  connect.options['heartbeat'] = 2;
  connect.on('ready', function() {
      var q = connect.queue(name);
      q.on('queueDeclareOk', function(args) {
          q.bind('#');
          q.on('queueBindOk', function() {
              q.subscribe(function(message) {
                  console.log(message.data.toString());
              });
          });
      });
  });
  connect.on('heartbeat', function() {
    console.log(" <- heartbeat");
    this.end();
  });
  connect.on('close', function() {
    console.log("closed");
    closed = true;
  });
  connect.on("error", function(err) {
    this.end();
    console.log(err);
  }); 
};

module.exports = new PubSub();