var util = require('util');

exports.hello = function hello(to) {
    util.puts(util.format('Hello %s', to));
}