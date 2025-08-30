const express = require('express');
const {connectDB} = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const proflieRouter = require("./routers/proflie");
const requestRouter = require("./routers/request");

app.use("/", authRouter);
app.use("/", proflieRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(2006, () => {
        console.log("Server is successfully listening on port 2006...")
    });
})
.catch((err) => {
    console.error("Database is not connected", err.message);
});

