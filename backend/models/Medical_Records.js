const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patients", required: true},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctors", required: true},
    diagnosis: {type: String},
    prescription: {type: String},
    notes: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("MedicalRecords", MedicalRecordSchema);