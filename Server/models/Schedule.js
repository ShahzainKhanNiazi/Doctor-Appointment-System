const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    days: {
        type: Array,
        default: [],
        required: true
    },
    from: {
        type: String,
      required: true
    },
    to: {
        type: String,
      required: true
    },
    doctor_id:{
        type: String,
        required: true
    },
},{timestamps: true}
)

module.exports = mongoose.model("Schedule", scheduleSchema);