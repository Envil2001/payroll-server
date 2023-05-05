const { Schema, model, default: mongoose } = require("mongoose");

const Employees = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        require: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    aids: {
        type: Number,
        required: true,
    },
    tin: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    {
        timestamps: true
    }
);

module.exports = model('Employees', Employees);