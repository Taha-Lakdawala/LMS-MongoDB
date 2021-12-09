const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

//helper
const {CalculateFine}= require('./helper/CalculateFine');

// Config
require('dotenv').config();
PORT = process.env.PORT;
db = process.env.MONGO_URI;

// Connect to Mongodb
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => {
        console.log("MongoDB connection failed, exiting now...");
        console.error(error);
        process.exit(1);
    });


// Routes
app.use(require("./routes/auth"));
app.use(require("./routes/admin"));
app.use(require("./routes/user"));
app.use(require("./routes/book"));


app.listen(PORT,CalculateFine() ,() => {
    console.log("Server is running on", PORT);
});