const express = require("express");
const router = express.Router();
const Patients = require("../models/Patients");
const auth = require("../middleware/auth");

router.get("/", auth, async(req,res) => {
    try{
        const patients = await Patients.find().populate("user", ["name", "email"]);
        res.json(patients);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server errors")
    }
})

module.exports = router;