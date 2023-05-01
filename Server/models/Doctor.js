const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
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
    education: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    license_no:{
        type: String,
        required: true
    },
    fee: {
        type: String,
        required: true
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
    specialization: {
        type: String,
        required: true
    },
    timings: {
        type: Array,
        default: []
    },
    patients: {
        type: Array,
        default: []
    },
    status:{
        type: String,
        required: true
    }
},{timestamps: true}
)

module.exports = mongoose.model('Doctor', doctorSchema);