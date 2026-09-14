require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const marketplaceRoutes = require("./routes/marketplaceRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const automationRoutes = require("./routes/automationRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const assistantRoutes = require("./routes/assistantRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/assistant", assistantRoutes);

app.use("/api/automation", automationRoutes);

app.use("/api/disease-check", diseaseRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "AquaCore backend is running"
    });

});

const PORT = 8000;

app.listen(PORT, () => {

    console.log(
        `Backend running on http://localhost:${PORT}`
    );

});