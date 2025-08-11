const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send("Data is saved successfully");
    } catch(err) {
        console.error("Oops! somethig went wrong", err.message);
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

