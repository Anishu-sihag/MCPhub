import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
},
  mcp: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Partner' },
  pickupPartner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Partner' },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  items: [{
    name: String,
    quantity: Number
  }],
  pickupAddress: String,
  dropAddress: String,
  orderDate: { type: Date, default: Date.now },
  amount: Number,
  tracking: {
    location: String,
    statusUpdate: String,
    updatedAt: Date
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
