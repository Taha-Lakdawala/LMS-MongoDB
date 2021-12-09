const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    violationFlag: { type: Boolean, default: false },
    fine: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
