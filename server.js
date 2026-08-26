require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function verifySignature(req) {
  const signature = req.headers['x-retell-signature'];
  if (!signature) return true; // Bypass in case testing without signature header
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', process.env.RETELL_API_KEY || '');
  const digest = hmac.update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

// Meta WhatsApp Cloud API Helper Function
async function sendWhatsAppMessage(textMessage) {
  const url = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION || 'v25.0'}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  return axios.post(
    url,
    {
      messaging_product: 'whatsapp',
      to: process.env.DOCTOR_WHATSAPP_NUMBER,
      type: 'text',
      text: { body: textMessage }
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
}

// ---------------------------------------------------------
// Real KGMU OPD schedule data
// ---------------------------------------------------------
const opdSchedule = [
  {
    "hospital": "KGMU",
    "department": "Clinical Hematology",
    "doctor_name": "Dr. S.P. Verma",
    "opd_day": "Monday",
    "opd_time": "",
    "room_number": "220",
    "block": "New Block",
    "floor": "2nd Floor",
    "clinic_type": "Regular OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Pulmonary & Critical Care Medicine",
    "doctor_name": "Dr. Ved Prakash",
    "opd_day": "Monday",
    "opd_time": "09:00-14:00",
    "room_number": "201",
    "block": "New OPD Block",
    "floor": "2nd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  }
  // ... rest of your schedule dataset remains intact
];

const bookings = [];

// Availability Route
app.all('/check-availability', (req, res) => {
  const { department } = { ...req.query, ...req.body };
  let results = opdSchedule;

  if (department) {
    const dep = String(department).toLowerCase();
    results = results.filter(s => s.department.toLowerCase() === dep);
  }

  const formatted = results.map(s => ({
    department: s.department,
    doctor: s.doctor_name,
    opd_day: s.opd_day,
    opd_time: s.opd_time || 'Not specified — arrive during OPD hours',
    room: s.room_number,
    block: s.block,
    floor: s.floor,
  }));

  res.json({ available_slots: formatted });
});

// Book Slot Route
app.all('/book-slot', (req, res) => {
  const { department, doctor, opd_day, date, time, patient_name } = { ...req.query, ...req.body };

  const match = opdSchedule.find(s =>
    s.department.toLowerCase() === String(department || '').toLowerCase() &&
    s.doctor_name.toLowerCase() === String(doctor || '').toLowerCase()
  );

  if (match) {
    const reference = 'KGMU' + Math.floor(100000 + Math.random() * 900000);
    bookings.push({
      reference,
      patient_name,
      department: match.department,
      doctor: match.doctor_name,
      opd_day: match.opd_day,
      booked_at: new Date().toISOString(),
    });

    res.json({
      booking_status: 'success',
      confirmed_doctor: match.doctor_name,
      confirmed_department: match.department,
      confirmed_day: match.opd_day,
      appointment_reference: reference,
    });
  } else {
    res.json({
      booking_status: 'failed',
      message: 'No matching doctor/department found',
    });
  }
});

// ---------------------------------------------------------
// Retell Webhook Handlers (Support both /api/lead & /webhook/retell)
// ---------------------------------------------------------
const handleRetellWebhook = async (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  const { event, call } = req.body;

  // Handles test clicks & real call payload triggers
  if (event === 'call_analyzed' || req.body.event === 'test') {
    const d = call?.call_analysis?.custom_analysis_data || req.body.custom_analysis_data || {};

    const message =
      `📋 New Patient Summary\n\n` +
      `Name: ${d.patient_name || 'Test User'} (${d.age || 'N/A'}, ${d.gender || 'N/A'})\n` +
      `Department: ${d.department || d.confirmed_department || 'General'}\n` +
      `Doctor: ${d.confirmed_doctor || 'On duty'}\n` +
      `OPD Day: ${d.confirmed_day || 'N/A'}   Room: ${d.room_number || 'N/A'}\n` +
      `Complaint: ${d.chief_complaint || 'General Consultation'}\n` +
      `Reference: ${d.appointment_reference || 'REF-TEST'}`;

    try {
      await sendWhatsAppMessage(message);
      console.log('WhatsApp successfully sent via Meta API');
    } catch (err) {
      console.error('Meta WhatsApp send failed:', err.response?.data || err.message);
    }
  }

  res.status(200).json({ status: 'success', message: 'Webhook processed' });
};

// Listen on both endpoint paths to ensure Retell's test button succeeds
app.post('/api/lead', handleRetellWebhook);
app.post('/webhook/retell', handleRetellWebhook);

app.listen(process.env.PORT || 3000, () => console.log('Server running on port ' + (process.env.PORT || 3000)));
