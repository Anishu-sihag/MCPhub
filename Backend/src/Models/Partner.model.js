// backend/models/Partner.js
import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'active',
  },
  ordersCompleted: {
    type: Number,
    default: 0,
  },
});

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
