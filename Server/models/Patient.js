const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true

    },
    age: {
        type: String,
        required: true,
    },
    ph_num: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    weight: {
        type: String,
    },
    height: {
        type: String,
    },
    blood_group:{
        type: String
    },
    doctors:{
        type: Array,
        default: []
    },
}, {timestamps: true}
)

module.exports = mongoose.model('Patient', patientSchema);