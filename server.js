const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).send("MediRoute AI Webhook Server is live!");
});

/**
 * 1. POST /check-availability
 * Triggered by Retell AI tool: `lookup_available_appointment_slots`
 */
app.post("/check-availability", (req, res) => {
  console.log("--> Received Availability Check:", req.body);

  const { department, facility_id, date, consultation_type, doctor_id } = req.body;

  // Mock slot data matching the tool expected format: data.available_options
  const availableSlots = [
    {
      doctor_name: "Dr. A. K. Sharma",
      date: date || "2026-09-01",
      time: "10:00 AM",
      department: department || "General Medicine",
      slot_id: "SLOT_101"
    },
    {
      doctor_name: "Dr. Priya Verma",
      date: date || "2026-09-01",
      time: "11:30 AM",
      department: department || "General Medicine",
      slot_id: "SLOT_102"
    },
    {
      doctor_name: "Dr. Rajesh Gupta",
      date: date || "2026-09-01",
      time: "02:00 PM",
      department: department || "General Medicine",
      slot_id: "SLOT_103"
    }
  ];

  return res.status(200).json({
    status: "success",
    data: {
      available_options: availableSlots
    }
  });
});

/**
 * 2. POST /book-slot
 * Triggered by Retell AI tool: `book_appointment`
 */
app.post("/book-slot", (req, res) => {
  console.log("--> Received Booking Request:", req.body);

  const {
    patient_name,
    patient_age,
    patient_phone,
    department,
    doctor,
    date,
    time,
    consultation_type,
    opd_day
  } = req.body;

  // Basic validation check
  if (!patient_name) {
    return res.status(400).json({
      status: "failed",
      message: "Patient name is required to complete booking."
    });
  }

  // Generate a unique appointment reference ID
  const bookingReference = "MED-" + Math.floor(100000 + Math.random() * 900000);

  // Response structure matching tool response variables:
  // data.status, data.reference, data.doctor, data.date, data.time, data.consultation_instructions
  return res.status(200).json({
    status: "success",
    data: {
      status: "confirmed",
      reference: bookingReference,
      doctor: doctor || "Duty Specialist",
      date: date || "2026-09-01",
      time: time || "10:00 AM",
      consultation_instructions: "Please report to the registration desk 15 minutes before your scheduled time."
    }
  });
});

/**
 * 3. POST /api/lead
 * Triggered by Retell AI: Main Webhook URL for post-call analysis data
 */
app.post("/api/lead", (req, res) => {
  console.log("--> Post-Call Analysis Received:", JSON.stringify(req.body, null, 2));

  // Process or store patient details & post-call logs here (e.g., save to MongoDB/PostgreSQL)

  return res.status(200).json({
    status: "success",
    message: "Post-call data received successfully."
  });
});

// Render dynamic port binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
