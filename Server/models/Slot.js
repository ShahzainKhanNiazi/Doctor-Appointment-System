const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Slot", slotSchema);