const express = require('express');
const router = express.Router();

const Order = require('../controllers/payment/order');
const Payment = require('../controllers/payment/payment');

router.post('/order' , Order);
router.post('/payment' , Payment);

module.exports = router;