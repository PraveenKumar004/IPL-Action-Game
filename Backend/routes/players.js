const express = require('express');
const router = express.Router();
const PlayerModel = require('../models/players');

router.post('/createplayer', async (req, res) => {
    try {
        const { name, country,countryshort,category,nation,points,baseprice } = req.body;
        const find = await PlayerModel.findOne({ name });
        if (find) {
            console.log("Already Exist");
            res.json("exist");
        } else {
            const manager = await PlayerModel.create({ name, country,countryshort,category,nation,points,baseprice });
            res.json(manager._id);
        }
    } catch (err) {
        console.log("Create Manager Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/getplayer', async (req, res) => {
    try {
        const details = await PlayerModel.find();
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Manager not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;