function Order(orderId) {
    this.OrderId = orderId;
    this.Status = "Processing";
}

function OrderProcessor(order) {
    this.Order = function() { return order; }
}

OrderProcessor.prototype.Execute = function() {
    console.log("Processing order...");
    this.CompleteOrder();
    this.DisplayConfirmation();
};

OrderProcessor.prototype.CompleteOrder = function() {
    this.PaymentGateway();
    this.UpdateOrderProfile();

    if (this.Status === 'complete') {
        this.UpdateInventory();
        this.SendEmailConfirmation();
        this.UpdateReporting();
    }
};

OrderProcessor.prototype.PaymentGateway = function() {
    setTimeout( function() {
        console.log("Making payment, calling payment gateway..."); }, 2000);

    this.Status = "complete";
};

OrderProcessor.prototype.UpdateOrderProfile = function() {
    setTimeout( function() {
        console.log("Updating order status and order history..."); }, 4000)
};

OrderProcessor.prototype.UpdateInventory = function() {
    setTimeout( function() {
        console.log("Updating inventory..."); }, 6000)
};

OrderProcessor.prototype.SendEmailConfirmation = function() {
    setTimeout( function() {
        console.log("Sending email confirmation..."); }, 8000)
};

OrderProcessor.prototype.UpdateReporting = function() {
    setTimeout( function() {
        console.log("Updating reporting..."); }, 10000)
};

OrderProcessor.prototype.DisplayConfirmation = function() {
    setTimeout( function() {
        console.log("Order complete..."); }, 12000)
};

module.exports.Order = Order;
module.exports.OrderProcessor = OrderProcessor;