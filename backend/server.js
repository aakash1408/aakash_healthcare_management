const express = require("express");
const cors = require("cors");
const connectTodb = require("./config/db");

const app = express();
app.use(cors());


app.use(express.json());



connectTodb();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/patients", require("./routes/patient.routes"));
app.use("/api/doctors", require("./routes/doctor.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/medical-records", require("./routes/record.routes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
