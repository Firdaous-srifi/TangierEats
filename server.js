const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use("/restaurants", require(path.join(__dirname, "api", "restaurant.js")));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(PORT, () => {
    console.log("Server Listening On Port " + PORT);
});