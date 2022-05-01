const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        minlength: [4, "min 4 req"]
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        minlength: [4, "min 4 req"]
    },
    email: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userScheme)