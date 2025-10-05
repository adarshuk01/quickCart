const bcrypt = require('bcrypt');
const transporter = require('../config/mailer');
const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.signup = async (req, res) => {
    console.log('req.body',req.body);
  const { firstName,lastName, email, password } = req.body;

  

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Generate and save OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { firstName,lastName, email, password, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Delete OTP record after use
    await Otp.deleteOne({ email });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: true
    });

    await user.save();

    res.status(201).json({ message: "OTP verified, user created", user: { firstName,lastName, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  try {
    // Compare with environment variables
    console.log( 'process.env.ADMIN_EMAIL', process.env.ADMIN_EMAIL);
    console.log('process.env.ADMIN_PASSWORD',process.env.ADMIN_PASSWORD);
    
    
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};