const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    specialization: {},
    availableDays: [{type: String}],
    timing: {
        start: {type: String},
        end: {type: String}
    }
});

module.exports = mongoose.model("Doctors", DoctorSchema);