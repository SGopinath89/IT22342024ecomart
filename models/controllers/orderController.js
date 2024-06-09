const express = require('express');
const mongoose = require('mongoose');
const Order = require('../../models/order.model');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('menu');
});

router.get('/cart', (req, res) => {
    res.render('cart');
});

router.get('/orders', (req, res) => {
    res.render('orders');
});

router.get('/admin', (req, res) => {
    Order.find((err, docs) => {
        if (!err) {
            res.render("admin", {
                order: docs
            });
        } else {
            console.log('Error in order:' + err);
        }
    });
});

router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("orders", { order: doc });
        } else {
            console.log('Error findById:' + err);
        }
    });
});

router.get('/order/delete/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin');
        } else {
            console.log('Error in delete :' + err);
        }
    });
});

// POST
router.post('/cart', (req, res) => {
    insertOrder(req, res);
});

router.post('/order', (req, res) => {
    updateOrder(req, res);
});

// Functions
function updateOrder(req, res) {
    Order.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/admin');
        } else {
            console.log('Update error :' + err);
        }
    });
}

function insertOrder(req, res) {
    var d = new Date();
    var counter = d.getTime();
    counter += 1;
    var order = new Order({
        total: req.body.total,
        order: counter,
        customerName: req.body.customerName, // Make sure to include this field in the form
        items: req.body.items // Make sure to include this field in the form
    });
    order.save((err, doc) => {
        if (!err) {
            res.redirect('/admin');
        } else {
            console.log('Error insertOrder :' + err);
        }
    });
}

module.exports = router;
