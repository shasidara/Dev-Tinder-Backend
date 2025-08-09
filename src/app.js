const express = require('express');

const app = express();

app.patch("/user", (req, res) => {
    res.send("Hello from patch request!");
})

app.delete("/user", (req, res) => {
    res.send("Abaracadabra");
})

app.post("/user", (req, res) => {
    res.send("Hello hello hello....");
});

app.get("/user", (req, res) => {
    res.send("Hello from dashboard!");
});


app.listen(2006, () => {
    console.log("server is successfully listening on port 2006");
});