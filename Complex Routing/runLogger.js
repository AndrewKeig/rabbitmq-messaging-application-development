var logging = require('./logging');
var logger = new logging();
logger.Log("SendEmail", "INFO", "Sent email");
logger.Log("Producer", "ERROR","Order has not been acknowledged");
logger.Log("Order", "ERROR","Payment was not accepted");