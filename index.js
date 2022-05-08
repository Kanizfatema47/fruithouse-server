const express = require("express");
const cors = require("cors");

const port = 5000;
const app = express();

require("dotenv").config();


app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Server is running succesfully. Now connect mongodb to your server")
})

app.listen(port, () => {
    console.log("server is running");
})