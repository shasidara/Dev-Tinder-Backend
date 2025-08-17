const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/user");
const user = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch(err) {
        console.error("Oops! somethig went wrong", err.message);
    }
});

app.get("/user", async (req, res) => {
    const users = await User.findOne({email: req.body.email});
    try {
        if (!users) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Oops! Something went wrong");
    }
});

app.get("/feed", async (req, res) => {
    const users = await User.find({});
    try {
        if(!users) {
            res.status(404).send("Users not found");
        } else {
            res.send(users);
        }
    } catch(err) {
        res.status(404).send("Oops! Something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const users = await User.findByIdAndDelete(userId);  
        if(!users){
            res.status(404).send("Users not found");
        } else {
            res.send("User successfully deleted");
        }
    } catch(err) {
        res.status(404).send("Oops! something went wrong");
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after"});
        if(!users) {
            res.status(404).send("Users not found");
        } else {
            res.send("User updated successfully");
        }
    } catch(err) {
        res.status(404).send("Oops! something went wrong");
    }
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(2006, () => {
        console.log("Server is successfully listening on port 2006...")
    });
})
.catch((err) => {
    console.error("Database is not connected", err.message);
});

