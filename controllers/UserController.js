
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

const getYourInfo = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}


const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashed, role, cPassword : password });
  res.status(200).json({ message: 'User created', user: newUser, password: password });
}

const deleteUser = async (req, res) => {

  const { id } = req.params;
  const response = await User.deleteOne({ _id: id });
  if (response.deletedCount === 1)
    res.send(200).Json({ message: "User deleted successfully" });
  else {
    res.send(404).Json({ message: "OOPs! user delete unsuccess" });
  }

}

const editUser = async(req,res) => {

  const {_id, name, email, role, leaveBalance} = req.body;
 

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { name, email, role, leaveBalance },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User updated successfully", user: updatedUser });
}


const checkPassword = async  (req, res ) =>{
  const {id} = req.params;
  const user = await User.findById(id).select('cPassword');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }


  res.status(200).json({ password: user.cPassword }); 
} 
const userController = {
  getYourInfo,
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
  checkPassword
};

export default userController;

