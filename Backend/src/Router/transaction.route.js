import express from 'express';
import Payment from '../Models/Transaction.model.js';

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Add a new payment
router.post('/', async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const saved = await newPayment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add payment' });
  }
});

export default router;
