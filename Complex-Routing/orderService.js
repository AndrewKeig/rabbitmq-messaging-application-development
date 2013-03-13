var loggingService = require('./loggingService');
var logger = new loggingService();

module.exports = function OrderService(order) {
    this.Order = order;
    this.Checkout = function() {
        logger.Log("Checkout", "INFO", "Placed order " + this.Order.OrderId);
    };
    this.ProcessOrder = function() {
        this.PaymentGateway();
        this.UpdateStatus();
        logger.Log("ProcessOrder", "INFO", "Thank you for placing your order");        
        return this.Status;
    };
    this.PaymentGateway = function() {
        logger.Log("PaymentGateway", "INFO", "Made payment");
        this.Status = "OrderComplete";
    };
    this.UpdateStatus = function() {
        logger.Log("UpdateStatus", "INFO", "Updated status");
    };
    this.UpdateInventory = function() {
        logger.Log("UpdateInventory", "INFO", "Updated inventory");
    };
    this.SendEmail = function() {
        logger.Log("SendEmail", "INFO", "Sent email");
    };
    this.UpdateReporting = function() {
        logger.Log("UpdateReporting", "INFO", "Updated reporting");
    };
    this.UpdateRecommendations = function() {
        logger.Log("UpdateRecommendations", "INFO", "Updated recommendations");
    };
};