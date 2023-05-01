const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    slot_id: {
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    doctor_id:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    patient_id:{
        type: String,
    },
    patientName:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "pending",
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema);