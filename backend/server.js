const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const twilio = require('twilio');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/iyyaDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// MongoDB Schemas
const messageSchema = new mongoose.Schema({
  phoneNumber: String,
  message: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Twilio Setup (WhatsApp)
const twilioClient = process.env.TWILIO_ACCOUNT_SID ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

// Razorpay Setup
const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
}) : null;

// ----------------------------------------------------
// REST ROUTES
// ----------------------------------------------------

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 1. WhatsApp Integration Endpoint
app.post('/api/whatsapp/send', async (req, res) => {
  const { phoneNumber, message } = req.body;
  
  if (!twilioClient) {
     return res.status(500).json({ error: 'Twilio Client not configured. Add keys to /backend/.env' });
  }

  try {
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    // Send via Twilio WhatsApp API
    const twilioResponse = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886', // Twilio Sandbox Number
      to: `whatsapp:${formattedNumber}`
    });

    const newMsg = await Message.create({ phoneNumber: formattedNumber, message, status: 'sent' });

    res.status(200).json({ success: true, messageId: newMsg._id, sid: twilioResponse.sid });
  } catch (error) {
    console.error('WhatsApp Error:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message.', details: error.message });
  }
});

// 2. Payments Integration Endpoint (Razorpay Order creation)
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  if (!razorpay) {
    return res.status(500).json({ error: 'Razorpay not configured. Add keys to /backend/.env' });
  }

  try {
    const options = {
      amount: parseInt(amount) * 100, // amount in paisa (smallest unit)
      currency,
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend API Server running on port ${PORT}`));
