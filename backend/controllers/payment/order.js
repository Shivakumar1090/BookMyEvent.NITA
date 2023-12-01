// const Instance = require('../../config/razorpay');
const Razorpay = require('razorpay');


const Order = (req,res) => {
    console.log(req.body.amount);
    const Instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture : 1
    };
    Instance.orders.create(options, function(err, order) {
        if(err){
            return res.send(err)}
        else{
            console.log(order);
            return res.json(order)}
    });
}

module.exports = Order;
