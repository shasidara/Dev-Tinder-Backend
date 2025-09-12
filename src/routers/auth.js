const express = require("express");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        //validation of data
        validateSignupData(req);

        const { firstName, lastName, email, password } = req.body;
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of the User
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        await user.save();
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("Data added successfully");
        }
    } catch(err) {
        res.status(404).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        const users = await User.findOne({ email: email });
        if(!users){
            throw new Error("Invalid credential");
        };

        const isPasswordValid = await users.validatePassword(password);
        if(isPasswordValid){

            const token = await users.getJWT();

            res.cookie("token", token, 
                { expires: new Date(Date.now() + 8 * 3600000) }
            );
            res.send(users);
        } else {
            throw new Error("Invalid credential");
        };
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.send("Logouted successfully")
});


module.exports = authRouter;