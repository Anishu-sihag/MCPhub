import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import partnerRoutes from './src/Router/Partner.route.js';
import paymentRoutes from './src/Router/transaction.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routing
app.use('/api/partners', partnerRoutes);
app.use('/api/payments', paymentRoutes);


// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Start server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
