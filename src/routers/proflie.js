const express = require("express");
const {userAuth} = require("../middleware/auth");

const proflieRouter = express.Router();

proflieRouter.get("/profile", userAuth, async (req, res) => {
    try{
       const users = req.users;
       
       res.send(users);
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

module.exports = proflieRouter;