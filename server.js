require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ---------------------------------------------------------
// Real KGMU OPD schedule data (department, doctor, weekly OPD day, room)
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
    "department": "Clinical Hematology",
    "doctor_name": "Dr. Soniya Nityanand",
    "opd_day": "Wednesday",
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
    "department": "Clinical Hematology",
    "doctor_name": "Dr. Swasti Sinha",
    "opd_day": "Wednesday",
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
    "department": "Clinical Hematology",
    "doctor_name": "Dr. S.P. Verma",
    "opd_day": "Friday",
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
    "department": "Clinical Hematology",
    "doctor_name": "Dr. Swasti Sinha",
    "opd_day": "Friday",
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
  },
  {
    "hospital": "KGMU",
    "department": "Pulmonary & Critical Care Medicine",
    "doctor_name": "Dr. Lt Gen (retd) Dr (Prof) BNBM Prasad",
    "opd_day": "Wednesday",
    "opd_time": "09:00-14:00",
    "room_number": "201",
    "block": "New OPD Block",
    "floor": "2nd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Pulmonary & Critical Care Medicine",
    "doctor_name": "Dr. Ved Prakash",
    "opd_day": "Friday",
    "opd_time": "09:00-14:00",
    "room_number": "201",
    "block": "New OPD Block",
    "floor": "2nd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurology",
    "doctor_name": "Prof. Neeraj Kumar",
    "opd_day": "Monday",
    "opd_time": "",
    "room_number": "301, 302, 305, 306",
    "block": "New OPD Building",
    "floor": "3rd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurology",
    "doctor_name": "Dr. Harish Nigam",
    "opd_day": "Monday",
    "opd_time": "",
    "room_number": "301, 302, 305, 306",
    "block": "New OPD Building",
    "floor": "3rd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurology",
    "doctor_name": "Prof. Rajesh Verma",
    "opd_day": "Tuesday",
    "opd_time": "",
    "room_number": "301, 302, 305, 306",
    "block": "New OPD Building",
    "floor": "3rd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurology",
    "doctor_name": "Dr. Prachi Mohapatra",
    "opd_day": "Tuesday",
    "opd_time": "",
    "room_number": "301, 302, 305, 306",
    "block": "New OPD Building",
    "floor": "3rd Floor",
    "clinic_type": "General OPD",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Avadhesh Yadav",
    "opd_day": "Monday",
    "opd_time": "09:00-13:00",
    "room_number": "322",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Trauma Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Manish Jaiswal",
    "opd_day": "Tuesday",
    "opd_time": "09:00-13:00",
    "room_number": "322",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Vascular Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. B. K. Ojha",
    "opd_day": "Wednesday",
    "opd_time": "09:00-13:00",
    "room_number": "323",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Spine Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Ankur Bajaj",
    "opd_day": "Wednesday",
    "opd_time": "09:00-13:00",
    "room_number": "322",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Spine Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Hanuman Prajapati",
    "opd_day": "Wednesday",
    "opd_time": "09:00-13:00",
    "room_number": "321",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Spine Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Somil Jaiswal",
    "opd_day": "Thursday",
    "opd_time": "09:00-13:00",
    "room_number": "322",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Pediatric Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Anil Chandra",
    "opd_day": "Friday",
    "opd_time": "09:00-13:00",
    "room_number": "322",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Skull Base Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Neurosurgery",
    "doctor_name": "Dr. Mohammad Faheem",
    "opd_day": "Friday",
    "opd_time": "09:00-13:00",
    "room_number": "321",
    "block": "New OPD Block",
    "floor": "3rd Floor",
    "clinic_type": "Skull Base Neurosurgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Urology",
    "doctor_name": "Dr. Vishwajeet Singh",
    "opd_day": "Monday",
    "opd_time": "09:00-14:00",
    "room_number": "420/421",
    "block": "New OPD Block",
    "floor": "4th Floor",
    "clinic_type": "Urology",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Urology",
    "doctor_name": "Dr. Vivek Kumar Singh",
    "opd_day": "Monday",
    "opd_time": "09:00-14:00",
    "room_number": "420/421",
    "block": "New OPD Block",
    "floor": "4th Floor",
    "clinic_type": "Human Organ Transplantation",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Urology",
    "doctor_name": "Dr. Apul Goel",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "420/421",
    "block": "New OPD Block",
    "floor": "4th Floor",
    "clinic_type": "Urology",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Urology",
    "doctor_name": "Dr. Manoj Kumar",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "420/421",
    "block": "New OPD Block",
    "floor": "4th Floor",
    "clinic_type": "Urology",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Urology",
    "doctor_name": "Dr. Avneet Gupta",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "420/421",
    "block": "New OPD Block",
    "floor": "4th Floor",
    "clinic_type": "Urology",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Agarwal",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Saini",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Chowdhery",
    "opd_day": "Tuesday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Agarwal",
    "opd_day": "Thursday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Saini",
    "opd_day": "Thursday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Chowdhery",
    "opd_day": "Thursday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Agarwal",
    "opd_day": "Friday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Saini",
    "opd_day": "Friday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "KGMU",
    "department": "Sports Medicine / Sports Injury",
    "doctor_name": "Dr. Abhishek Chowdhery",
    "opd_day": "Friday",
    "opd_time": "09:00-14:00",
    "room_number": "425",
    "block": "New OPD Building",
    "floor": "4th Floor",
    "clinic_type": "Sports Medicine/Sports Surgery",
    "source": "official KGMU",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "Integral Hospital",
    "department": "All specialties / Specialist Faculty",
    "doctor_name": "Specialist Faculty (doctor-specific roster not publicly verified)",
    "opd_day": "Monday-Friday",
    "opd_time": "09:00-16:00",
    "room_number": "",
    "block": "",
    "floor": "",
    "clinic_type": "Specialist OPD",
    "source": "official Integral University/IIMSR",
    "last_verified": "2026-08-25"
  },
  {
    "hospital": "Integral Hospital",
    "department": "All specialties / Specialist Faculty",
    "doctor_name": "Specialist Faculty (doctor-specific roster not publicly verified)",
    "opd_day": "Saturday",
    "opd_time": "09:00-14:00",
    "room_number": "",
    "block": "",
    "floor": "",
    "clinic_type": "Specialist OPD",
    "source": "official Integral University/IIMSR",
    "last_verified": "2026-08-25"
  }
];

// In-memory booking log so we don't double count anything during a demo
const bookings = [];

// Look up doctors/OPD days available for a department
app.all('/check-availability', (req, res) => {
  const { department, consultation_type } = { ...req.query, ...req.body };

  let results = opdSchedule;

  if (department) {
    const dep = String(department).toLowerCase();
    results = results.filter(s => s.department.toLowerCase().includes(dep));
  }

  // consultation_type isn't in this dataset (all are physical/in-person OPD),
  // so we only use it if you later add virtual slots yourself.
  if (consultation_type && consultation_type === 'virtual') {
    results = [];
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

// Confirm a booking against a specific doctor + department + day
app.all('/book-slot', (req, res) => {
  const { department, doctor, opd_day, date, time, patient_name } =
    { ...req.query, ...req.body };

  const match = opdSchedule.find(s =>
    s.department.toLowerCase() === String(department || '').toLowerCase() &&
    s.doctor_name.toLowerCase() === String(doctor || '').toLowerCase() &&
    (!opd_day || s.opd_day.toLowerCase() === String(opd_day).toLowerCase())
  );

  if (match) {
    const reference = 'KGMU' + Math.floor(100000 + Math.random() * 900000);
    bookings.push({
      reference,
      patient_name,
      department: match.department,
      doctor: match.doctor_name,
      opd_day: match.opd_day,
      opd_time: match.opd_time,
      room: match.room_number,
      date: date || null,
      booked_at: new Date().toISOString(),
    });

    res.json({
      booking_status: 'success',
      confirmed_doctor: match.doctor_name,
      confirmed_department: match.department,
      confirmed_day: match.opd_day,
      confirmed_time: match.opd_time || time || 'During OPD hours',
      confirmed_date: date || null,
      room_number: match.room_number,
      block: match.block,
      appointment_reference: reference,
    });
  } else {
    res.json({
      booking_status: 'failed',
      message: 'No matching doctor/department/day found in OPD schedule',
    });
  }
});

// ---------------------------------------------------------
// Retell webhook — sends the post-call summary to the doctor via WhatsApp
// ---------------------------------------------------------
app.post('/webhook/retell', async (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  const { event, call } = req.body;

  if (event === 'call_analyzed') {
    const d = call.call_analysis?.custom_analysis_data || {};

    if (d.booking_status === 'success' || d.booking_status === 'confirmed') {
      const message =
        `\ud83d\udccb New Patient Summary\n\n` +
        `Name: ${d.patient_name || 'N/A'} (${d.age || '?'}, ${d.gender || '?'})\n` +
        `Department: ${d.department || d.confirmed_department || 'N/A'}\n` +
        `Doctor: ${d.confirmed_doctor || 'N/A'}\n` +
        `OPD Day: ${d.confirmed_day || 'N/A'}   Room: ${d.room_number || 'N/A'}\n` +
        `Complaint: ${d.chief_complaint || 'N/A'}\n` +
        `History: ${d.existing_conditions || 'None reported'}\n` +
        `Reference: ${d.appointment_reference || 'N/A'}`;

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
    } else {
      console.log('Booking not confirmed \u2014 no WhatsApp sent.');
    }
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
