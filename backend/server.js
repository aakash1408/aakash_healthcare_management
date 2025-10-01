const express = require("express");
const cors = require("cors");
const connectTodb = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectTodb();

app.use("/api/auth", require());
app.use("/api/patient", require());
app.use("/api/doctors", require());
app.use("/api/appointments". require());
app/use("api/medical-records", require());

app.listen(5000, () => console.log("Server running on port 5000"));
