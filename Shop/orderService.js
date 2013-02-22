module.exports = function OrderService(order) {
    this.Order = function() { return order; };
    this.Checkout = function() {
        console.log("INFO, Placed order");
        this.ProcessOrder();
        this.DisplayConfirmation();
    };
    this.ProcessOrder = function() {
        this.PaymentGateway();
        this.UpdateStatus();

        if (this.Status === 'OrderComplete') {
            this.UpdateInventory();
            this.SendEmail();
            this.UpdateReporting();
        }
    };
    this.PaymentGateway = function() {
        setTimeout( function() { console.log('INFO, Made payment');}, 2000);
        this.Status = "OrderComplete";
    };
    this.UpdateStatus = function() {
        setTimeout( function() { console.log('INFO, Updated status'); }, 4000);
    };
    this.UpdateInventory = function() {
        setTimeout( function() { console.log('INFO, Updated inventory'); }, 6000);
    };
    this.SendEmail = function() {
        setTimeout( function() { console.log('INFO, Sent email');}, 8000);
    };
    this.UpdateReporting = function() {
        setTimeout( function() { console.log('INFO, Updated reporting'); }, 10000);
    };
    this.DisplayConfirmation = function() {
        setTimeout( function() { console.log('INFO, Order complete...'); }, 12000);
    };
};