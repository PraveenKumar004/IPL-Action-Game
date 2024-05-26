const express = require('express');
const router = express.Router();
const ManagerModel = require('../models/manager');

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

module.exports = router;