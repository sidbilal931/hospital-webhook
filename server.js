require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

function verifySignature(req) {
  const signature = req.headers['x-retell-signature'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', process.env.RETELL_API_KEY);
  const digest = hmac.update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

app.post('/webhook/retell', async (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  const { event, call } = req.body;

  if (event === 'call_analyzed') {
    const d = call.call_analysis?.custom_analysis_data || {};

    const message =
      `📋 New Patient Summary\n\n` +
      `Name: ${d.patient_name || 'N/A'} (${d.age || '?'}, ${d.gender || '?'})\n` +
      `Complaint: ${d.chief_complaint || 'N/A'}\n` +
      `History: ${d.existing_conditions || 'None reported'}\n` +
      `Appointment: ${d.appointment_date || 'N/A'} at ${d.appointment_time || 'N/A'}`;

    try {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.DOCTOR_WHATSAPP_NUMBER,
      });
      console.log('WhatsApp sent to doctor');
    } catch (err) {
      console.error('WhatsApp send failed:', err.message);
    }
  }

  res.sendStatus(200);
});

// Mock available slots — replace with real DB later
let slots = [
  { date: '2026-08-27', time: '10:00 AM', available: true },
  { date: '2026-08-27', time: '11:00 AM', available: true },
  { date: '2026-08-27', time: '02:00 PM', available: true },
  { date: '2026-08-28', time: '09:30 AM', available: true },
];

app.post('/check-availability', (req, res) => {
  const available = slots.filter(s => s.available);
  res.json({ available_slots: available });
});

app.post('/book-slot', (req, res) => {
  const { date, time } = req.body;
  const slot = slots.find(s => s.date === date && s.time === time && s.available);
  if (slot) {
    slot.available = false;
    res.json({ success: true, message: `Booked ${date} at ${time}` });
  } else {
    res.json({ success: false, message: 'Slot not available' });
  }
});
app.listen(process.env.PORT || 3000, () => console.log('Server running'));
