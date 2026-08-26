require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function verifySignature(req) {
  const signature = req.headers['x-retell-signature'];
  if (!signature || !process.env.RETELL_API_KEY) {
    return true; 
  }
  
  try {
    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', process.env.RETELL_API_KEY);
    const digest = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch (err) {
    return true; 
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
];

const bookings = [];

// Availability Route (Matches Retell's available_options variable)
app.all('/check-availability', (req, res) => {
  const { department } = { ...req.query, ...req.body };
  let results = opdSchedule;

  if (department) {
    const dep = String(department).toLowerCase().trim();
    results = results.filter(s => 
      s.department.toLowerCase().includes(dep) || dep.includes(s.department.toLowerCase())
    );
  }

  if (results.length === 0) {
    results = opdSchedule;
  }

  const formatted = results.map(s => ({
    department: s.department,
    doctor: s.doctor_name,
    opd_day: s.opd_day,
    opd_time: s.opd_time || '09:00-14:00',
    room: s.room_number,
    block: s.block,
    floor: s.floor,
  }));

  res.json({ 
    available_options: formatted,
    available_slots: formatted 
  });
});

// Book Slot Route (Matches Retell's status/doctor/reference variables)
app.all('/book-slot', (req, res) => {
  const { department, doctor, opd_day, date, time, patient_name } = { ...req.query, ...req.body };

  const reqDept = String(department || '').toLowerCase().trim();
  const reqDoc = String(doctor || '').toLowerCase().trim();

  let match = opdSchedule.find(s =>
    (reqDept && s.department.toLowerCase().includes(reqDept)) ||
    (reqDoc && s.doctor_name.toLowerCase().includes(reqDoc))
  );

  if (!match && opdSchedule.length > 0) {
    match = opdSchedule[0];
  }

  if (match) {
  // ---------------------------------------------------------
// Retell Webhook Handlers
// ---------------------------------------------------------
const handleRetellWebhook = async (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  const { event, call } = req.body;
  console.log('Webhook Received Event:', event);

  // Trigger on end of call analysis or manual test payload
  if (event === 'call_analyzed' || event === 'test') {
    const analysis = call?.call_analysis?.custom_analysis_data || req.body.custom_analysis_data || {};
    const args = call?.collected_dynamic_variables || {};

    const name = analysis.patient_name || args.patient_name || 'Patient';
    const age = analysis['age — type: number'] || args.patient_age || 'N/A';
    const gender = analysis['gender — type: string'] || 'N/A';
    const dept = args.department || 'General';
    const doc = args.selected_doctor || 'On Duty Doctor';
    const complaint = analysis.chief_complaint || 'General Consultation';
    const ref = args.appointment_reference || 'REF-' + Math.floor(100000 + Math.random() * 900000);

    const message =
      `📋 *New Patient Summary*\n\n` +
      `👤 *Name:* ${name} (Age: ${age}, ${gender})\n` +
      `🏥 *Department:* ${dept}\n` +
      `👨‍⚕️ *Doctor:* ${doc}\n` +
      `💬 *Complaint:* ${complaint}\n` +
      `🎟️ *Reference:* ${ref}`;

    try {
      await sendWhatsAppMessage(message);
      console.log('WhatsApp successfully sent via Meta API!');
    } catch (err) {
      console.error('Meta WhatsApp send failed:', err.response?.data || err.message);
    }
  }

  res.status(200).json({ status: 'success', message: 'Webhook processed' });
};
  } else {
    res.json({
      status: 'failed',
      booking_status: 'failed',
      message: 'No matching slot found',
    });
  }
});

// ---------------------------------------------------------
// Retell Webhook Handlers
// ---------------------------------------------------------
const handleRetellWebhook = async (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  const { event, call } = req.body;

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

app.post('/api/lead', handleRetellWebhook);
app.post('/webhook/retell', handleRetellWebhook);

app.listen(process.env.PORT || 3000, () => console.log('Server running on port ' + (process.env.PORT || 3000)));
