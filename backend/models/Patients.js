const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    age: {type: Number, required: true},
    gender: {type: String, enum: ["male", "female", "other"], required: true},
    contact: {type: String},
    medicalHistory: [{type: String}]
})

module.exports = mongoose.model("Patients", PatientSchema);