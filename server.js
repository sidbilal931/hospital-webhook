const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Root & Base Webhook Test Handlers (Handles Retell's default webhook test button)
app.get("/", (req, res) => {
  res.status(200).send("MediRoute AI Webhook Server is live!");
});

app.post("/", (req, res) => {
  console.log("--> Received Base Webhook Test Ping:", req.body);
  return res.status(200).json({ status: "success", message: "Webhook reachable!" });
});

// 2. Post-Call Analysis Endpoint (Matches /api/lead)
app.all("/api/lead", (req, res) => {
  console.log("--> Received Lead/Post-Call Webhook Ping:", req.body);
  return res.status(200).json({
    status: "success",
    message: "Post-call webhook endpoint active!"
  });
});

// 3. Availability Endpoint
app.post("/check-availability", (req, res) => {
  console.log("--> Received Availability Check:", req.body);
  const { department, date } = req.body;

  const availableSlots = [
    { doctor_name: "Dr. A. K. Sharma", date: date || "2026-09-01", time: "10:00 AM", slot_id: "SLOT_101" },
    { doctor_name: "Dr. Priya Verma", date: date || "2026-09-01", time: "11:30 AM", slot_id: "SLOT_102" }
  ];

  return res.status(200).json({
    status: "success",
    data: { available_options: availableSlots }
  });
});

// 4. Appointment Booking Endpoint
app.post("/book-slot", (req, res) => {
  console.log("--> Received Booking Request:", req.body);
  const { patient_name, doctor, date, time } = req.body;

  const bookingReference = "MED-" + Math.floor(100000 + Math.random() * 900000);

  return res.status(200).json({
    status: "success",
    data: {
      status: "confirmed",
      reference: bookingReference,
      doctor: doctor || "Duty Specialist",
      date: date || "2026-09-01",
      time: time || "10:00 AM"
    }
  });
});

// Port Binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
