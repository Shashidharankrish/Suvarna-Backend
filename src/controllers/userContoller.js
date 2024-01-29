const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signToken = require('../utils/token');
const { use } = require('../routes/userRoutes');
const mongoose = require('mongoose');

const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Username, email, password, firstName and lastName are required' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Return the user details
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If the password is valid, generate a JWT token
    const token = signToken(user._id);
    console.log(user.username, "Logged In")
    // Send the token in the response
    res.status(200).json({ token, user: { firstName: user.firstName, lastName: user.lastName, profileImage: user.profileImage, createdAt: user.createdAt, updatedAt: user.updatedAt, isAdmin: true } });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const profile = async (req, res) => {
  // Implementation for fetching user profile
};

const updateProfile = async (req, res) => {
  // Implementation for updating user profile
};

const deleteAccount = async (req, res) => {
  // Implementation for deleting user account
};

module.exports = { register, login, profile, updateProfile, deleteAccount };
