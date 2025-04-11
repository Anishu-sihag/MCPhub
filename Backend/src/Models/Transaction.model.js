import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    partner: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      required: true,
      enum: ['UPI', 'Credit Card', 'Net Banking'],
    },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    },
    type: {
      type: String,
      default: 'Credit',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Payment = model('Payment', paymentSchema);

export default Payment;
