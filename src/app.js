const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from dashboard!");
});

app.get("/hello", (req, res) => {
    res.send("Hello hello hello....");
});

app.listen(2006, () => {
    console.log("server is successfully listening on port 2006");
});