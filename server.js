const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ============================================================================
// IN-MEMORY DATASTORE
// ============================================================================

const doctors = [
  {
    doctor_id: "AYUSH-0056",
    doctor_name: "Dr. Ananya Gupta",
    ayush_system: "Ayurveda",
    department: "Shalya Tantra",
    location: "Kanpur",
    state: "Uttar Pradesh",
    clinic_name: "Kanpur Ayurveda Wellness Centre 6",
    available_days: ["Monday", "Wednesday", "Friday"],
    start_time: "17:00",
    end_time: "20:00",
    slot_duration_minutes: 15,
    timezone: "Asia/Kolkata",
    appointment_mode: "In-person, Virtual",
    booking_status: "available",
    data_type: "synthetic_training_record"
  },
  {
    doctor_id: "AYUSH-0057",
    doctor_name: "Dr. Vikram Gupta",
    ayush_system: "Ayurveda",
    department: "Prasuti & Stri Roga",
    location: "Bhopal",
    state: "Madhya Pradesh",
    clinic_name: "Bhopal Ayurveda Wellness Centre 6",
    available_days: ["Monday", "Tuesday", "Thursday"],
    start_time: "09:00",
    end_time: "12:00",
    slot_duration_minutes: 15,
    timezone: "Asia/Kolkata",
    appointment_mode: "In-person, Virtual",
    booking_status: "available",
    data_type: "synthetic_training_record"
  },
  {
    doctor_id: "AYUSH-0058",
    doctor_name: "Dr. Kavya Gupta",
    ayush_system: "Ayurveda",
    department: "Kaumarbhritya",
    location: "Indore",
    state: "Madhya Pradesh",
    clinic_name: "Indore Ayurveda Wellness Centre 6",
    available_days: ["Wednesday", "Friday", "Saturday"],
    start_time: "10:00",
    end_time: "13:00",
    slot_duration_minutes: 15,
    timezone: "Asia/Kolkata",
    appointment_mode: "In-person, Virtual",
    booking_status: "available",
    data_type: "synthetic_training_record"
  }
];

const appointments = [];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (totalMinutes) => {
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const m = String(totalMinutes % 60).padStart(2, '0');
  return `${h}:${m}`;
};

const getEndTime = (startTimeStr, durationMinutes = 15) => {
  const startMins = timeToMinutes(startTimeStr);
  return minutesToTime(startMins + durationMinutes);
};

const getAvailableSlots = (doctorId, date) => {
  const doctor = doctors.find((d) => d.doctor_id === doctorId);
  if (!doctor) return [];

  const shiftStart = timeToMinutes(doctor.start_time);
  const shiftEnd = timeToMinutes(doctor.end_time);
  const slotDuration = 15;

  const bookedTimes = appointments
    .filter((app) => app.doctor_id === doctorId && app.date === date && app.status === 'booked')
    .map((app) => app.start_time);

  const availableSlots = [];

  for (let current = shiftStart; current + slotDuration <= shiftEnd; current += slotDuration) {
    const slotStartStr = minutesToTime(current);
    if (!bookedTimes.includes(slotStartStr)) {
      availableSlots.push(slotStartStr);
    }
  }

  return availableSlots;
};

// ============================================================================
// API ROUTES
// ============================================================================

app.get('/', (req, res) => {
  res.send({ status: 'active', message: 'Hospital Webhook Backend Operational' });
});

app.get('/api/doctors', (req, res) => {
  res.json({ success: true, count: doctors.length, data: doctors });
});

app.get('/api/doctors/:id/available-slots', (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date parameter (YYYY-MM-DD) is required.' });
  }

  const availableSlots = getAvailableSlots(id, date);
  return res.json({ success: true, doctor_id: id, date, available_slots: availableSlots });
});

app.post('/api/appointments/book', (req, res) => {
  const { doctor_id, patient_name, date, start_time } = req.body;

  if (!doctor_id || !patient_name || !date || !start_time) {
    return res.status(400).json({
      success: false,
      message: 'Missing required parameters: doctor_id, patient_name, date, start_time.'
    });
  }

  const doctor = doctors.find((d) => d.doctor_id === doctor_id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found.' });
  }

  const isAlreadyBooked = appointments.some(
    (app) =>
      app.doctor_id === doctor_id &&
      app.date === date &&
      app.start_time === start_time &&
      app.status === 'booked'
  );

  if (isAlreadyBooked) {
    const alternatives = getAvailableSlots(doctor_id, date);

    return res.status(409).json({
      success: false,
      already_booked: true,
      message: `The time slot ${start_time} is already booked for Dr. ${doctor.doctor_name} on ${date}.`,
      suggested_slots: alternatives.slice(0, 3)
    });
  }

  const newAppointment = {
    booking_id: `BK-${Date.now()}`,
    doctor_id,
    doctor_name: doctor.doctor_name,
    patient_name,
    date,
    start_time,
    end_time: getEndTime(start_time, 15),
    slot_duration_minutes: 15,
    status: 'booked',
    created_at: new Date().toISOString()
  };

  appointments.push(newAppointment);

  return res.status(201).json({
    success: true,
    message: 'Appointment booked successfully.',
    booking: newAppointment
  });
});

app.listen(PORT, () => {
  console.log(`Server executing on port ${PORT}`);
});
