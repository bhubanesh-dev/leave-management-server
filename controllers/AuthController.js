import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    //  Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {

    const { newPassword } = req.body;


    const hashed = await bcrypt.hash(newPassword, 10);
    const response = await User.findByIdAndUpdate(req.user.id, { password: hashed, cPassword: newPassword });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const authController = {
  register,
  login,
  changePassword,
  logout
};


export default authController;
