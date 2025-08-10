const express = require('express');

const {adminAuth} = require("./middleware/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
    res.send("sent data successfully");
});

app.delete("/admin/deleteData", (req, res) => {
    res.send("deleted data successfully");
})

app.listen(2006, () => {
    console.log("server is successfully listening on port 2006");
});