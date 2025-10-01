const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patients", required: true},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctors", required: true},
    date: {type: Date, required: true},
    status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    },
    reason: {type: String}
});

module.exports = mongoose.model("Appointment", AppointmentSchema);