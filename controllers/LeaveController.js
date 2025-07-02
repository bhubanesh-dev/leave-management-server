
import User from "../models/userSchema.js";
import calculateDays from "../utils/index.js";
import Leave from "../models/LeaveSchema.js";


const applyLeave = async (req, res) => {
  const { title, reason, startDate, endDate } = req.body;
  let user = req.user;


  if (!user.name) {
    user = await User.findById(user.id || user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  }

  const noOfDays = calculateDays(startDate, endDate);

  if (noOfDays > user.leaveBalance) {
    return res.status(400).json({ message: 'Insufficient leave balance' });
  }

  const newLeave = await Leave.create({
    userId: user._id,
    userName: user.name,
    title,
    reason,
    startDate,
    endDate,
    noOfDays
  });
  res.status(201).json({ message: 'Leave applied', leave: newLeave });
}


const getYourLeaves = async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
}

const getAllLeaves = async (req, res) => {
  const allLeaves = await Leave.find().populate('userId', 'name email role');
  res.json(allLeaves);
};


const updateLeaves = async (req, res) => {
  const { id, status } = req.params;
  const leave = await Leave.findById(id);
  if (!leave) return res.status(404).json({ message: 'Leave not found' });


  const { noOfDays } = req.body;
  if (status === 'Approved') {
    const user = await User.findById(leave.userId);
    if (user.leaveBalance >= noOfDays) {
      user.leaveBalance = Math.max(0, user.leaveBalance - noOfDays);
      await user.save();
    }else{
      return res.status(202).send({message: "user is short of leave.",leave});
    }
  }

  leave.status = status;
  if (noOfDays > 0) {
    leave.noOfDays = noOfDays;
  }
  await leave.save();
  res.status(200).json({ message: 'Leave status updated', leave });
}

const leaveController = {
  applyLeave, getYourLeaves, getAllLeaves, updateLeaves
}

export default leaveController;
