const express = require("express");

const store = require("../data/store");

const router = express.Router();

router.post("/evaluate", (req, res) => {

    const { temp, ph, oxygen } = req.body;

    const actions = [];

    // Rule 1: Low oxygen
    if (oxygen < 4.5) {
        actions.push({
            action: "aerator_on",
            reason: "Low dissolved oxygen"
        });
    }

    // Rule 2: pH outside safe range
    if (ph < 6.5 || ph > 8.5) {
        actions.push({
            action: "ph_buffer_release",
            reason: "pH out of safe range"
        });
    }

    // Rule 3: High temperature
    if (temp > 30) {
        actions.push({
            action: "cooling_pump_on",
            reason: "High temperature"
        });
    }

    // Log every action
    actions.forEach(action => {

        const log = {
            ...action,
            time: new Date()
        };

        store.activityLog.push(log);
    });

    res.json({
        message: "Automation evaluated",
        actions
    });
});

router.get("/activity", (req, res) => {

    res.json(store.activityLog);

});

module.exports = router;