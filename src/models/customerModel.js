const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  otp: { type: String },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
