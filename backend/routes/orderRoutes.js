const express = require("express");

const store = require("../data/store");

const router = express.Router();

router.post("/place", (req, res) => {

    if (store.cart.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    const order = {
        orderId: store.orders.length + 1,
        items: [...store.cart],
        status: "Placed",
        createdAt: new Date()
    };

    store.orders.push(order);

    store.cart.length = 0;

    res.status(201).json({
        message: "Order placed successfully",
        order
    });
});

router.get("/", (req, res) => {
    res.json(store.orders);
});

module.exports = router;