require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const twilio = require('twilio');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true
}));
const twilioClient =
twilio(process.env.TWILIO_SID,
process.env.TWILIO_AUTH_TOKEN);
function verifySignature(req) {
  const signature = req.headers['x-retellsignature'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256',
process.env.RETELL_API_KEY);
  const digest =
hmac.update(payload).digest('hex');
  try {
    return
crypto.timingSafeEqual(Buffer.from(signatur
e), Buffer.from(digest));
  } catch {
    return false;
  }
}
// ----------------------------------------
-----------------
// AYUSH doctor directory (100 doctors).
Every doctor supports
// BOTH in-person and virtual
consultations, using the same
// day/time slots (a doctor can't be
double-booked across modes).
// ----------------------------------------
-----------------
const doctors = [
  {
    "doctor_id": "AYUSH-0001",
    "doctor_name": "Dr. Aarav Sharma",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Ayurveda
Wellness Centre 1",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0002",
    "doctor_name": "Dr. Ananya Sharma",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Ayurveda
Wellness Centre 1",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0003",
    "doctor_name": "Dr. Aditya Sharma",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Ayurveda
Wellness Centre 1",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0004",
    "doctor_name": "Dr. Aditi Sharma",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 1",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0005",
    "doctor_name": "Dr. Arjun Sharma",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Ayurveda
Wellness Centre 1",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0006",
    "doctor_name": "Dr. Diya Sharma",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Ayurveda
Wellness Centre 1",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0007",
    "doctor_name": "Dr. Kabir Sharma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Yoga &
Naturopathy Wellness Centre 1",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0008",
    "doctor_name": "Dr. Meera Sharma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Yoga &
Naturopathy Wellness Centre 1",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0009",
    "doctor_name": "Dr. Rohan Sharma",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Unani Wellness
Centre 1",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0010",
    "doctor_name": "Dr. Ishita Sharma",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Unani Wellness
Centre 1",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0011",
    "doctor_name": "Dr. Vivaan Sharma",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Siddha Wellness
Centre 2",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0012",
    "doctor_name": "Dr. Nisha Sharma",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Homoeopathy
Wellness Centre 2",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0013",
    "doctor_name": "Dr. Rahul Sharma",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Homoeopathy
Wellness Centre 2",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0014",
    "doctor_name": "Dr. Sneha Sharma",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 2",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0015",
    "doctor_name": "Dr. Karan Sharma",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Ayurveda
Wellness Centre 2",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0016",
    "doctor_name": "Dr. Pooja Sharma",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Ayurveda
Wellness Centre 2",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0017",
    "doctor_name": "Dr. Vikram Sharma",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Ayurveda
Wellness Centre 2",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0018",
    "doctor_name": "Dr. Kavya Sharma",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Ayurveda
Wellness Centre 2",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0019",
    "doctor_name": "Dr. Sahil Sharma",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Ayurveda Wellness
Centre 2",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0020",
    "doctor_name": "Dr. Neha Sharma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Yoga &
Naturopathy Wellness Centre 2",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0021",
    "doctor_name": "Dr. Aarav Verma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Yoga &
Naturopathy Wellness Centre 3",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0022",
    "doctor_name": "Dr. Ananya Verma",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Unani Wellness
Centre 3",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0023",
    "doctor_name": "Dr. Aditya Verma",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Unani
Wellness Centre 3",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0024",
    "doctor_name": "Dr. Aditi Verma",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Siddha
Wellness Centre 3",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0025",
    "doctor_name": "Dr. Arjun Verma",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Homoeopathy
Wellness Centre 3",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0026",
    "doctor_name": "Dr. Diya Verma",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Homoeopathy
Wellness Centre 3",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0027",
    "doctor_name": "Dr. Kabir Verma",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Ayurveda
Wellness Centre 3",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0028",
    "doctor_name": "Dr. Meera Verma",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Ayurveda
Wellness Centre 3",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0029",
    "doctor_name": "Dr. Rohan Verma",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Ayurveda Wellness
Centre 3",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0030",
    "doctor_name": "Dr. Ishita Verma",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Ayurveda
Wellness Centre 3",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0031",
    "doctor_name": "Dr. Vivaan Verma",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Ayurveda
Wellness Centre 4",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0032",
    "doctor_name": "Dr. Nisha Verma",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Ayurveda
Wellness Centre 4",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0033",
    "doctor_name": "Dr. Rahul Verma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Yoga &
Naturopathy Wellness Centre 4",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0034",
    "doctor_name": "Dr. Sneha Verma",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Yoga &
Naturopathy Wellness Centre 4",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0035",
    "doctor_name": "Dr. Karan Verma",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Unani
Wellness Centre 4",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0036",
    "doctor_name": "Dr. Pooja Verma",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Unani Wellness
Centre 4",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0037",
    "doctor_name": "Dr. Vikram Verma",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Siddha Wellness
Centre 4",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0038",
    "doctor_name": "Dr. Kavya Verma",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Homoeopathy
Wellness Centre 4",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0039",
    "doctor_name": "Dr. Sahil Verma",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Homoeopathy
Wellness Centre 4",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0040",
    "doctor_name": "Dr. Neha Verma",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Ayurveda
Wellness Centre 4",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0041",
    "doctor_name": "Dr. Aarav Gupta",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Ayurveda
Wellness Centre 5",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0042",
    "doctor_name": "Dr. Ananya Gupta",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Ayurveda
Wellness Centre 5",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0043",
    "doctor_name": "Dr. Aditya Gupta",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Ayurveda
Wellness Centre 5",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0044",
    "doctor_name": "Dr. Aditi Gupta",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 5",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0045",
    "doctor_name": "Dr. Arjun Gupta",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Ayurveda
Wellness Centre 5",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0046",
    "doctor_name": "Dr. Diya Gupta",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Yoga &
Naturopathy Wellness Centre 5",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0047",
    "doctor_name": "Dr. Kabir Gupta",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Yoga &
Naturopathy Wellness Centre 5",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0048",
    "doctor_name": "Dr. Meera Gupta",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Unani Wellness
Centre 5",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0049",
    "doctor_name": "Dr. Rohan Gupta",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Unani Wellness
Centre 5",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0050",
    "doctor_name": "Dr. Ishita Gupta",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Siddha
Wellness Centre 5",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0051",
    "doctor_name": "Dr. Vivaan Gupta",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Homoeopathy
Wellness Centre 6",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0052",
    "doctor_name": "Dr. Nisha Gupta",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Homoeopathy
Wellness Centre 6",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0053",
    "doctor_name": "Dr. Rahul Gupta",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Ayurveda
Wellness Centre 6",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0054",
    "doctor_name": "Dr. Sneha Gupta",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 6",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0055",
    "doctor_name": "Dr. Karan Gupta",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Ayurveda
Wellness Centre 6",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0056",
    "doctor_name": "Dr. Pooja Gupta",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Ayurveda
Wellness Centre 6",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0057",
    "doctor_name": "Dr. Vikram Gupta",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Ayurveda
Wellness Centre 6",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0058",
    "doctor_name": "Dr. Kavya Gupta",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Ayurveda
Wellness Centre 6",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0059",
    "doctor_name": "Dr. Sahil Gupta",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Yoga &
Naturopathy Wellness Centre 6",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0060",
    "doctor_name": "Dr. Neha Gupta",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Yoga &
Naturopathy Wellness Centre 6",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0061",
    "doctor_name": "Dr. Aarav Singh",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Unani Wellness
Centre 7",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0062",
    "doctor_name": "Dr. Ananya Singh",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Unani Wellness
Centre 7",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0063",
    "doctor_name": "Dr. Aditya Singh",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Siddha
Wellness Centre 7",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0064",
    "doctor_name": "Dr. Aditi Singh",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Homoeopathy
Wellness Centre 7",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0065",
    "doctor_name": "Dr. Arjun Singh",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Homoeopathy
Wellness Centre 7",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0066",
    "doctor_name": "Dr. Diya Singh",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Ayurveda
Wellness Centre 7",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0067",
    "doctor_name": "Dr. Kabir Singh",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Ayurveda
Wellness Centre 7",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0068",
    "doctor_name": "Dr. Meera Singh",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Ayurveda
Wellness Centre 7",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0069",
    "doctor_name": "Dr. Rohan Singh",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Ayurveda Wellness
Centre 7",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0070",
    "doctor_name": "Dr. Ishita Singh",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Ayurveda
Wellness Centre 7",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0071",
    "doctor_name": "Dr. Vivaan Singh",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Ayurveda
Wellness Centre 8",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0072",
    "doctor_name": "Dr. Nisha Singh",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Yoga &
Naturopathy Wellness Centre 8",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0073",
    "doctor_name": "Dr. Rahul Singh",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Yoga &
Naturopathy Wellness Centre 8",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0074",
    "doctor_name": "Dr. Sneha Singh",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Unani Wellness
Centre 8",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0075",
    "doctor_name": "Dr. Karan Singh",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Unani
Wellness Centre 8",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0076",
    "doctor_name": "Dr. Pooja Singh",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Siddha Wellness
Centre 8",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0077",
    "doctor_name": "Dr. Vikram Singh",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Homoeopathy
Wellness Centre 8",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0078",
    "doctor_name": "Dr. Kavya Singh",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Homoeopathy
Wellness Centre 8",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0079",
    "doctor_name": "Dr. Sahil Singh",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Ayurveda Wellness
Centre 8",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0080",
    "doctor_name": "Dr. Neha Singh",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Ayurveda
Wellness Centre 8",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0081",
    "doctor_name": "Dr. Aarav Khan",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Ayurveda
Wellness Centre 9",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0082",
    "doctor_name": "Dr. Ananya Khan",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Ayurveda
Wellness Centre 9",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0083",
    "doctor_name": "Dr. Aditya Khan",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Ayurveda
Wellness Centre 9",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0084",
    "doctor_name": "Dr. Aditi Khan",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 9",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0085",
    "doctor_name": "Dr. Arjun Khan",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Yoga &
Naturopathy Wellness Centre 9",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0086",
    "doctor_name": "Dr. Diya Khan",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Yoga &
Naturopathy Wellness Centre 9",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0087",
    "doctor_name": "Dr. Kabir Khan",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Unani Wellness
Centre 9",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0088",
    "doctor_name": "Dr. Meera Khan",
    "ayush_system": "Unani",
    "department": "Ilmul Qabalat",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Unani Wellness
Centre 9",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0089",
    "doctor_name": "Dr. Rohan Khan",
    "ayush_system": "Siddha",
    "department": "General Siddha",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Siddha Wellness
Centre 9",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0090",
    "doctor_name": "Dr. Ishita Khan",
    "ayush_system": "Homoeopathy",
    "department": "General Homoeopathy",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Homoeopathy
Wellness Centre 9",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0091",
    "doctor_name": "Dr. Vivaan Khan",
    "ayush_system": "Homoeopathy",
    "department": "Paediatrics",
    "location": "Lucknow",
    "state": "Uttar Pradesh",
    "clinic_name": "Lucknow Homoeopathy
Wellness Centre 10",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0092",
    "doctor_name": "Dr. Nisha Khan",
    "ayush_system": "Ayurveda",
    "department": "General Ayurveda",
    "location": "Kanpur",
    "state": "Uttar Pradesh",
    "clinic_name": "Kanpur Ayurveda
Wellness Centre 10",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0093",
    "doctor_name": "Dr. Rahul Khan",
    "ayush_system": "Ayurveda",
    "department": "Panchakarma",
    "location": "Prayagraj",
    "state": "Uttar Pradesh",
    "clinic_name": "Prayagraj Ayurveda
Wellness Centre 10",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0094",
    "doctor_name": "Dr. Sneha Khan",
    "ayush_system": "Ayurveda",
    "department": "Kayachikitsa",
    "location": "Varanasi",
    "state": "Uttar Pradesh",
    "clinic_name": "Varanasi Ayurveda
Wellness Centre 10",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "11:00",
    "end_time": "14:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0095",
    "doctor_name": "Dr. Karan Khan",
    "ayush_system": "Ayurveda",
    "department": "Shalya Tantra",
    "location": "New Delhi",
    "state": "Delhi",
    "clinic_name": "New Delhi Ayurveda
Wellness Centre 10",
    "available_days": "Monday, Wednesday,
Saturday",
    "start_time": "14:00",
    "end_time": "17:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0096",
    "doctor_name": "Dr. Pooja Khan",
    "ayush_system": "Ayurveda",
    "department": "Prasuti & Stri Roga",
    "location": "Jaipur",
    "state": "Rajasthan",
    "clinic_name": "Jaipur Ayurveda
Wellness Centre 10",
    "available_days": "Tuesday, Friday,
Saturday",
    "start_time": "16:00",
    "end_time": "19:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0097",
    "doctor_name": "Dr. Vikram Khan",
    "ayush_system": "Ayurveda",
    "department": "Kaumarbhritya",
    "location": "Bhopal",
    "state": "Madhya Pradesh",
    "clinic_name": "Bhopal Ayurveda
Wellness Centre 10",
    "available_days": "Monday, Wednesday,
Friday",
    "start_time": "17:00",
    "end_time": "20:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0098",
    "doctor_name": "Dr. Kavya Khan",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Yoga Therapy",
    "location": "Indore",
    "state": "Madhya Pradesh",
    "clinic_name": "Indore Yoga &
Naturopathy Wellness Centre 10",
    "available_days": "Tuesday, Thursday,
Saturday",
    "start_time": "18:00",
    "end_time": "21:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0099",
    "doctor_name": "Dr. Sahil Khan",
    "ayush_system": "Yoga & Naturopathy",
    "department": "Naturopathy",
    "location": "Patna",
    "state": "Bihar",
    "clinic_name": "Patna Yoga &
Naturopathy Wellness Centre 10",
    "available_days": "Monday, Tuesday,
Thursday",
    "start_time": "09:00",
    "end_time": "12:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  },
  {
    "doctor_id": "AYUSH-0100",
    "doctor_name": "Dr. Neha Khan",
    "ayush_system": "Unani",
    "department": "Moalajat",
    "location": "Dehradun",
    "state": "Uttarakhand",
    "clinic_name": "Dehradun Unani Wellness
Centre 10",
    "available_days": "Wednesday, Friday,
Saturday",
    "start_time": "10:00",
    "end_time": "13:00",
    "slot_duration_minutes": 30,
    "timezone": "Asia/Kolkata",
    "appointment_mode": "In-person,
Virtual",
    "booking_status": "available",
    "data_type":
"synthetic_training_record"
  }
];
const SLOT_MINUTES = 15;
// In-memory bookings: { doctor_name, day,
time, mode }
const bookings = [];
function toMinutes(hhmm) {
  const [h, m] =
hhmm.split(':').map(Number);
  return h * 60 + m;
}
function toHHMM(mins) {
  const h = Math.floor(mins /
60).toString().padStart(2, '0');
  const m = (mins %
60).toString().padStart(2, '0');
  return `${h}:${m}`;
}
function generateSlots(doctor) {
  const start =
toMinutes(doctor.start_time);
  const end = toMinutes(doctor.end_time);
  const slots = [];
  for (let t = start; t + SLOT_MINUTES <=
end; t += SLOT_MINUTES) {
    slots.push(toHHMM(t));
  }
  return slots;
}
// Booked times for a doctor+day,
regardless of mode (physical or virtual
// both consume the same real-world time
with that doctor).
function getBookedTimes(doctorName, day) {
  return bookings
    .filter(b =>
b.doctor_name.toLowerCase() ===
doctorName.toLowerCase() &&
b.day.toLowerCase() === day.toLowerCase())
    .map(b => b.time);
}
function getFreeRanges(doctor, day) {
  const allSlots = generateSlots(doctor);
  const booked = new
Set(getBookedTimes(doctor.doctor_name,
day));
  const ranges = [];
  let rangeStart = null;
  for (let i = 0; i < allSlots.length; i++)
{
    const slot = allSlots[i];
    const isFree = !booked.has(slot);
    if (isFree && rangeStart === null) {
      rangeStart = slot;
    }
    const isLast = i === allSlots.length -
1;
    if (rangeStart !== null &&
(booked.has(slot) || isLast)) {
      const rangeEndMinutes =
booked.has(slot)
        ? toMinutes(slot)
        : toMinutes(slot) + SLOT_MINUTES;
      ranges.push({ start: rangeStart, end:
toHHMM(rangeEndMinutes) });
      rangeStart = null;
    }
  }
  return ranges;
}
function getNextAvailable(doctor, day) {
  const ranges = getFreeRanges(doctor,
day);
  return ranges.length > 0 ?
ranges[0].start : null;
}
// ----------------------------------------
-----------------
// Look up doctors for a department. Works
identically whether the
// patient wants a physical or virtual
consultation, since every
// doctor supports both.
// ----------------------------------------
-----------------
app.all('/check-availability', (req, res)
=> {
  const { department, ayush_system,
location, consultation_type } = {
...req.query, ...req.body };
  let results = doctors.filter(d =>
d.booking_status === 'available');
  if (department) {
    const dep =
String(department).toLowerCase();
    results = results.filter(d =>
d.department.toLowerCase() === dep);
  }
  if (ayush_system) {
    const sys =
String(ayush_system).toLowerCase();
    results = results.filter(d =>
d.ayush_system.toLowerCase() === sys);
  }
  if (location) {
    const loc =
String(location).toLowerCase();
    results = results.filter(d =>
d.location.toLowerCase() === loc);
  }
  // consultation_type isn't used to filter
doctors (everyone supports both);
  // it's only relevant at booking time, so
it's accepted but not applied here.
  const formatted = results.map(d => ({
    doctor: d.doctor_name,
    ayush_system: d.ayush_system,
    department: d.department,
    location: d.location,
    clinic_name: d.clinic_name,
    available_days: d.available_days,
    start_time: d.start_time,
    end_time: d.end_time,
    slot_minutes: SLOT_MINUTES,
    appointment_mode: d.appointment_mode,
    requested_consultation_type:
consultation_type || null,
  }));
  res.json({ available_slots: formatted });
});
// ----------------------------------------
-----------------
// Book a specific 15-minute slot, physical
or virtual.
// A doctor's booked time blocks BOTH modes
for that slot.
// ----------------------------------------
-----------------
app.all('/book-slot', (req, res) => {
  const { department, doctor, day, time,
patient_name, consultation_type } = {
...req.query, ...req.body };
  const match = doctors.find(d =>
    d.booking_status === 'available' &&
    (!department ||
d.department.toLowerCase() ===
String(department).toLowerCase()) &&
    (!doctor || d.doctor_name.toLowerCase()
=== String(doctor).toLowerCase())
  );
  if (!match) {
    return res.json({ booking_status:
'failed', message: 'No matching
doctor/department found' });
  }
  const availableDays =
match.available_days.split(',').map(d =>
d.trim().toLowerCase());
  if (!day ||
!availableDays.includes(String(day).toLower
Case())) {
    return res.json({
      booking_status: 'invalid_day',
      message: `Dr. ${match.doctor_name} is
only available on:
${match.available_days}`,
      available_days: match.available_days,
    });
  }
  const validSlots = generateSlots(match);
  if (!time || !validSlots.includes(time))
{
    return res.json({
      booking_status: 'invalid_time',
      message: `Please choose a time
between ${match.start_time} and
${match.end_time}, in 15-minute
increments.`,
      start_time: match.start_time,
      end_time: match.end_time,
    });
  }
  const alreadyBooked =
getBookedTimes(match.doctor_name,
day).includes(time);
  if (alreadyBooked) {
    const freeRanges = getFreeRanges(match,
day);
    const nextAvailable =
getNextAvailable(match, day);
    return res.json({
      booking_status: 'slot_taken',
      message: 'That time is already
booked.',
      next_available: nextAvailable,
      free_ranges: freeRanges,
    });
  }
  const mode = (consultation_type &&
consultation_type.toLowerCase() ===
'virtual') ? 'Virtual' : 'In-person';
  bookings.push({ doctor_name:
match.doctor_name, day, time, mode });
  const reference = 'AYUSH' +
Math.floor(100000 + Math.random() *
900000);
  const endMinutes = toMinutes(time) +
SLOT_MINUTES;
  res.json({
    booking_status: 'success',
    confirmed_doctor: match.doctor_name,
    confirmed_department: match.department,
    confirmed_ayush_system:
match.ayush_system,
    confirmed_day: day,
    confirmed_time: `${time} -
${toHHMM(endMinutes)}`,
    confirmed_mode: mode,
    clinic_name: mode === 'Virtual' ?
'Video consultation link will be shared' :
match.clinic_name,
    location: mode === 'Virtual' ? 'Online'
: match.location,
    appointment_reference: reference,
  });
});
// ----------------------------------------
-----------------
// Retell webhook - sends the post-call
summary to the doctor via WhatsApp
// ----------------------------------------
-----------------
app.post('/webhook/retell', async (req,
res) => {
  if (!verifySignature(req)) return
res.status(401).json({ error: 'Invalid
signature' });
  const { event, call } = req.body;
  if (event === 'call_analyzed') {
    const d =
call.call_analysis?.custom_analysis_data ||
{};
    if (d.booking_status === 'success' ||
d.booking_status === 'confirmed') {
      const message =
        `\ud83d\udccb New Patient
Summary\n\n` +
        `Name: ${d.patient_name || 'N/A'}
(${d.age || '?'}, ${d.gender || '?'})\n` +
        `System: ${d.confirmed_ayush_system
|| 'N/A'}\n` +
        `Department: ${d.department ||
d.confirmed_department || 'N/A'}\n` +
        `Doctor: ${d.confirmed_doctor ||
'N/A'}\n` +
        `Mode: ${d.confirmed_mode ||
'N/A'}\n` +
        `Clinic: ${d.clinic_name || 'N/A'},
${d.location || ''}\n` +
        `Day: ${d.confirmed_day || 'N/A'}  
Time: ${d.confirmed_time || 'N/A'}\n` +
        `Complaint: ${d.chief_complaint ||
'N/A'}\n` +
        `History: ${d.existing_conditions
|| 'None reported'}\n` +
        `Reference:
${d.appointment_reference || 'N/A'}`;
      try {
        await
twilioClient.messages.create({
          body: message,
          from:
process.env.TWILIO_WHATSAPP_FROM,
          to:
process.env.DOCTOR_WHATSAPP_NUMBER,
        });
        console.log('WhatsApp sent to
doctor');
      } catch (err) {
        console.error('WhatsApp send
failed:', err.message);
      }
    } else {
      console.log('Booking not confirmed -
no WhatsApp sent.');
    }
  }
  res.sendStatus(200);
});
app.listen(process.env.PORT || 3000, () =>
console.log('Server running'));
