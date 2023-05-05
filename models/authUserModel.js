const { Schema, model,  default: mongoose } = require("mongoose");

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        index: true,
        nique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

module.exports = model('User', User);