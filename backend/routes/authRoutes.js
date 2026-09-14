const express = require("express");

const store = require("../data/store");

const router = express.Router();

// Register
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const existingUser = store.users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const newUser = {
        id: store.users.length + 1,
        name,
        email,
        password
    };

    store.users.push(newUser);

    res.status(201).json({
        message: "Registration successful",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// Login
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = store.users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

module.exports = router;