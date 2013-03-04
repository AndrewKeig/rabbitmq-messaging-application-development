module.exports = function OrderService(order) {
    this.Order = order;
    this.Checkout = function() {
        console.log("INFO, Placed order " + this.Order.OrderId);
    };
    this.ProcessOrder = function() {
        this.PaymentGateway();
        this.UpdateStatus();
        if (this.Status === 'OrderComplete') {
            this.UpdateInventory();
            this.SendEmail();
            this.UpdateReporting();
        }
        console.log('INFO, Thank you for placing your order...');
    };
    this.PaymentGateway = function() {
        console.log('INFO, Made payment');
        this.Status = "OrderComplete";
    };
    this.UpdateStatus = function() {
        console.log('INFO, Updated status');
    };
    this.UpdateInventory = function() {
        console.log('INFO, Updated inventory');
    };
    this.SendEmail = function() {
        console.log('INFO, Sent email');
    };
    this.UpdateReporting = function() {
        console.log('INFO, Updated reporting');
    };
};