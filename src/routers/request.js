const express = require("express");
const {userAuth} = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try{
        const users = req.users;
        console.log("Sending connection request to user.....");

        res.send(users.firstName + " send the connection request!");
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

module.exports = requestRouter;