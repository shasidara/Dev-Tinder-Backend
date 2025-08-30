const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid Token!!");
        };

        const decodedObj = await jwt.verify(token, "Dev#TindeR@2006");
        const {_id} = decodedObj;
      
        const users = await User.findById(_id);
        if(!users){
            throw new Error("User not found");
        };

        req.users = users;
        next();

    } catch(err) {
        res.status(400).send("ERROR:" + err.message);
    };
};

module.exports = { userAuth };