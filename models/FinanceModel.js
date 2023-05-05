const { Schema, model,  default: mongoose } = require("mongoose");

const Finance = new Schema({
    date: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    premius: {
        type: Number,
        required: true,
    },
    fines: {
        type: Number,
        required: true,
    },
    awards : {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    }
);

module.exports = model('Finance', Finance);