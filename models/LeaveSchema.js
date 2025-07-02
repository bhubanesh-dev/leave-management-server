import mongoose from "mongoose";


const leaveRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  noOfDays:{
    type: Number,
    required:true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending'
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;
