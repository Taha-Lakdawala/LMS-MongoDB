const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    return_date:{
        type: Date,
        default: () => new Date(Date.now() + 8*24*60*60*1000).setHours(0, 0, 0, 0)
    },
    returned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Issue", IssueSchema);