const express = require('express');
const router = express.Router();
const AuctionModel = require('../models/auction');
const SoldModel = require('../models/soldplayer');
const UnSoldModel = require('../models/unsoldplayer');
const ContestantModel = require('../models/contestant');

router.post('/addauctionplayer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, country, countryshort, category, nation, points, baseprice, _id } = req.body;
        const find = await AuctionModel.findOne({ mid: id });
        const sold = await SoldModel.find({ mid: id });
        const unsoldp = await UnSoldModel.find({ mid: id });
        if (find) {
            console.log("Already Exist");
            res.json("exist");
        } else {
            const isPlayerInArray = (array, playerId) => array.some(item => item.player.toString() === playerId);
            if (isPlayerInArray(sold, _id) || isPlayerInArray(unsoldp, _id)) {
                console.log("Player is either sold or unsold");
                res.json("soldorunsold");
            }
            else {
                const manager = await AuctionModel.create({ mid: id, name, country, countryshort, category, nation, points, baseprice, player: _id, price: 0, pid: "no", teamName: "" });
                res.json(manager._id);
            }

        }
    } catch (err) {
        console.log("Create Manager Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/auctionplayer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await AuctionModel.findOne({ mid: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/soldplayer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const find = await AuctionModel.findOne({ mid: id });
        if (find.pid === "no") {
            await UnSoldModel.create({
                mid: id,
                name: find.name,
                country: find.country,
                countryshort: find.countryshort,
                category: find.category,
                nation: find.category,
                points: find.points,
                baseprice: find.baseprice,
                player: find.player,
                price: find.price,
                pid: find.pid,
                teamName: find.teamName
            });
            await AuctionModel.findOneAndDelete({ mid: id });
            res.json("unsold");
        }
        else {
            await SoldModel.create({
                mid: id,
                name: find.name,
                country: find.country,
                countryshort: find.countryshort,
                category: find.category,
                nation: find.category,
                points: find.points,
                baseprice: find.baseprice,
                player: find.player,
                price: find.price,
                pid: find.pid,
                teamName: find.teamName
            });
            const player = await ContestantModel.findOne({ _id: find.pid });
            if (player) {
                const newpoints = player.points + find.points;
                const newamount = player.amount - find.price;
                await ContestantModel.findOneAndUpdate({ _id: find.pid }, { points: newpoints, amount: newamount });
            } else {
                console.error(`Player with id ${find.pid} not found`);
            }
            await AuctionModel.findOneAndDelete({ mid: id });
            res.json(find.pid);
        }

    } catch (err) {
        console.log("Create Manager Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getsoldplayersbypid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await SoldModel.find({ mid: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getunsoldplayersbypid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await UnSoldModel.find({ mid: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
