const express = require('express');
const router = express.Router();
const ContestantModel = require('../models/contestant');
const ManagerModel = require('../models/manager');
const SoldPlayer = require('../models/soldplayer');

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
            const cr = await ContestantModel.create({ mid:id, teamName, teamAbbreviation, password, amount:amountFind.amount, points:0 })
            res.json(cr._id);
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

router.post('/deletcontest/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ContestantModel.findOneAndDelete({ _id: id });
        await SoldPlayer.deleteMany({ pid: id });

        res.json("done");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/changepasswordcontest/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { password, newpassword } = req.body;
        console.log(password);
        console.log(newpassword)
        const find = await ContestantModel.findOne({ _id:id });
        if (find.password === password ) {
             await ContestantModel.findOneAndUpdate({_id:id},{password:newpassword});
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