import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Employee'],
    default: 'Employee',
    required: true
  },
  leaveBalance: {
    type: Number,
    default: 15
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cPassword: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

export default User;
