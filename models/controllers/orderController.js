const express = require('express');
const router = express.Router();
const Order = require('../../models/order.model');

// Route to display all orders
router.get('/admin', async (req, res) => {
    try {
        const orders = await Order.find().lean(); // Retrieve orders from MongoDB
        res.render('admin', { orders }); // Render 'admin.hbs' view with orders data
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders');
    }
});
// Route to render the orders insertion form
router.get('/orders', (req, res) => {
    res.render('orders');
});
// Route to render update form with order details
router.get('/order/update/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).lean();

        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.render('updateOrder', { order }); // Render 'updateOrder.hbs' with order data
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).send('Server error');
    }
});

// Handle update form submission
router.post('/order/update/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { total, customerName, items } = req.body;

        // Validate input if needed

        // Find order by ID and update
        const order = await Order.findByIdAndUpdate(orderId, {
            total,
            customerName,
            items
        }, { new: true }); // { new: true } ensures we get the updated document

        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/admin'); // Redirect to admin page after update
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).send('Server error');
    }
});

// DELETE route to delete an order by ID
router.get('/order/delete/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find order by ID and delete
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/admin'); // Redirect to admin page after deletion
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).send('Server error');
    }
});

// Handle form submission for inserting a new order
router.post('/cart', async (req, res) => {
    try {
        const { total, customerName, items } = req.body;

        // Create a new order
        const order = new Order({
            total,
            customerName,
            items
        });

        // Save the new order to MongoDB
        await order.save();

        res.redirect('/admin'); // Redirect to admin page after insertion
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
