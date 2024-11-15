const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, cpassword } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, passwordHash });

    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (error) {
    console.error("Error details:", error);  // Log the error to console with details
    res.status(500).json({
      message: 'Error registering user',
      error: error.message || "An unknown error occurred"
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
  
};
