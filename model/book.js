const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bname: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        minlength: 10,
        maxlength: 13,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    quantity :{
        type: Number,
        required: true
    },
    issued :{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Book", BookSchema); 