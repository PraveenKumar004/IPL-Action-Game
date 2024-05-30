const express = require('express');
const router = express.Router();
const ManagerModel = require('../models/manager');
const ContestModel = require('../models/contestant');
const AuctionModel = require('../models/auction');
const SoldModel = require('../models/soldplayer');
const UnsoldModel = require('../models/unsoldplayer');
const MessageModels = require('../models/message');

router.post('/createmanager', async (req, res) => {
    try {
        const { id, amount, password } = req.body;
        const find = await ManagerModel.findOne({ id });
        if (find) {
            console.log("Already Exist");
            res.json("exist");
        } else {
            const manager = await ManagerModel.create({ id, amount, password });
            res.json(manager._id);
        }
    } catch (err) {
        console.log("Create Manager Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/verifymanager', async (req, res) => {
    try {
        const { id, password } = req.body;
        const find = await ManagerModel.findOne({ id });
        if (find) {
            if (find.password === password) {
                res.json(find._id);
            }
            else{
                res.json('wrong')
            }  
        }
        else {
            res.json('wrong')
        }
    } catch (err) {
        console.log("Verify Manager Error:", err);
    }
});


router.get('/managerdetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const details = await ManagerModel.findOne({ _id:id });
        if (details) {
            res.json(details);
        } else {
            res.json("managernot");
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/managercontestant', async (req, res) => {
    try {
        const { id } = req.body;
        const details = await ManagerModel.findOne({ id:id });
        if (details) {
            res.json(details);
        } else {
            res.json("managernot");
        }
    } catch (err) {
        console.log("Error in Get Manager Details: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/deletmanager/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await ManagerModel.findOneAndDelete({ _id: id });
        await SoldModel.deleteMany({ mid: id });
        await UnsoldModel.deleteMany({ mid: id });
        await ContestModel.deleteMany({ mid: id });
        await AuctionModel.deleteMany({ mid: id });
        await MessageModels.deleteMany({ mid: id });
        res.json("done");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/deletmessage/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await MessageModels.deleteMany({ mid: id });
        res.json("done");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/changepasswordmanager/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { password, newpassword } = req.body;
        console.log(password);
        console.log(newpassword)
        const find = await ManagerModel.findOne({ _id:id });
        if (find.password === password ) {
             await ManagerModel.findOneAndUpdate({_id:id},{password:newpassword});
             res.json("passupdate")
        }
        else {
            res.json('wrong')
        }
    } catch (err) {
        console.log("Verify Manager Error:", err);
    }
});

module.exports = router;