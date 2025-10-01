const mongoose = require("mongoose");

//User -> Patient, Doctr, Admin (Seperate Model but will have referenced)

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "patient", "doctor"],
        default: "patient"
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Users", UserSchema);