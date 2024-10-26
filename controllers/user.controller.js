const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


async function registerUser(req, res ){
    try {
        const { name, email, password } = req.body;
    
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'Email already registered' });
    
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
      } 
    catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: `Login failed ${error}` });
  }
};


function logoutUser(req, res) {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};


async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};


async function updateUserProfile (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Profile update failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
