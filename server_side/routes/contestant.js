const express = require('express');
const router = express.Router();
const ContestantModel = require('../models/contestant');
const ManagerModel = require('../models/manager');

router.post('/createteam/:id', async (req, res) => {
    try {
        const{id}=req.params;
        const {teamName, teamAbbreviation, password } = req.body;
        const amountFind = await ManagerModel.findOne({ _id:id });
        if (amountFind === "a") {
            console.log("Already Exist");
            res.json("exist")
        }
        else {
            await ContestantModel.create({ mid:id, teamName, teamAbbreviation, password, amount:amountFind.amount, points:0 })
                .then(res.json("create"));
        }
    }
    catch (err) {
        console.log("Create Manager Error : ", err)
    }
});
router.get('/getteams/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await ContestantModel.find({ mid: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Teams not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
    }
});

router.post('/verifycontestant/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const details = await ContestantModel.findOne({ _id: id });
        if (details.password === password) {
            res.json("done");
            console.log(details.password)
        } else {
            res.json("wrong");
            console.log("not")
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getplayerdetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await ContestantModel.findOne({ _id: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ error: "Teams not found" });
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
    }
});

module.exports = router;