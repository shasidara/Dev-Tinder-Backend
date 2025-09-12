const express = require("express");
const {userAuth} = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const proflieRouter = express.Router();

proflieRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
       const users = req.users;
       
       res.json({data: users});
    } catch(err) {
        res.status(400).json({message: "ERROR: " + err.message});
    };
});

proflieRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        validateEditProfileData(req);
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        };

        const users = req.users;

        Object.keys(req.body).forEach((key) => (users[key] = req.body[key]))

        await users.save();

        res.json({message: `${users.firstName} your proflie updated successfully`, data: users});
    } catch(err) {
        res.status(400).json({message: "ERROR: " + err.message});
    };
});

proflieRouter.patch("/profile/password", userAuth, async (req, res) => {
    
})

module.exports = proflieRouter;