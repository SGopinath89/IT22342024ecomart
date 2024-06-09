// models/order.model.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
