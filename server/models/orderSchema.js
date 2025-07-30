import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dressType: {
    type: String,
    required: true
  },
  fabric: String,
  deliveryDate: {
    type: Date,
    required: true
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    length: Number
  },
  notes: String,
status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });


export default mongoose.model("orders" , orderSchema);
