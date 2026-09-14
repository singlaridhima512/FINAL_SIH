const express = require("express");
const store = require("../data/store");

const router = express.Router();

// Get cart
router.get("/", (req, res) => {
    res.json(store.cart);
});

// Add product to cart
router.post("/add", (req, res) => {
    const { productId } = req.body;

    const product = store.cart.find(
        item => item.productId === productId
    );

    if (product) {
        product.quantity++;
    } else {
        store.cart.push({
            productId: productId,
            quantity: 1
        });
    }

    res.json({
        message: "Product added to cart",
        cart: store.cart
    });
});

// Update quantity
router.put("/update", (req, res) => {
    const { productId, quantity } = req.body;

    const product = store.cart.find(
        item => item.productId === productId
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found in cart"
        });
    }

    if (quantity <= 0) {
        return res.status(400).json({
            message: "Quantity must be greater than 0"
        });
    }

    product.quantity = quantity;

    res.json({
        message: "Cart updated",
        cart: store.cart
    });
});

// Remove product
router.delete("/remove/:productId", (req, res) => {
    const productId = Number(req.params.productId);

    const productIndex = store.cart.findIndex(
        item => item.productId === productId
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found in cart"
        });
    }

    store.cart.splice(productIndex, 1);

    res.json({
        message: "Product removed",
        cart: store.cart
    });
});

module.exports = router;