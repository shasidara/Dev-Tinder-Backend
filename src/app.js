const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth");
const user = require('./models/user');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
            res.send("Login Successfully!!");
        } else {
            throw new Error("Invalid credential");
        };
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

app.get("/profile", userAuth, async (req, res) => {
    try{
       const user = req.user;
       
       res.send(user);
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try{
        const users = req.users;
        console.log("Sending connection request to user.....");

        res.send(users.firstName + " send the connection request!");
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
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

