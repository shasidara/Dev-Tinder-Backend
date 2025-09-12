const express = require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try{
        const users = req.users;
        console.log("Sending connection request to user.....");

        res.json({message: users.firstName + " send the connection request!"});
    } catch(err) {
        res.status(400).json({message: err.message});
    };
});

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.users._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Invalid status type: " + status});
        };

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(400).json({message: "User not found!"})
        };

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).json({message: "Connection request already exists!"})
        };

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Successfully send the request",
            data: data,
        });

    } catch(err) {
        res.status(400).json({message: err.message})
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.users;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ message: "Status is not valid!"})
        };

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if(!connectionRequest){
            return res.status(404).json({ message: "User is not found!"})
        };

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection Request " + status, data: data});
    }catch (err) {
        res.status(400).json({message: err.message})
    };
});

module.exports = requestRouter;