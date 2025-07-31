//this satisfies the feature = POST/register and Post/login in our project
//what it does? 1)create a new user 2)validating the login credentials 3)Returning a JWT token on successful login
// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);//imp line as it hashes the password before saving

    // create new user
    const newUser = new User({
      email,
      password_hash: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);//imp line as it checks if the entered password with the hashed one
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // create token
    //also below is the imp line because it creates a secure logn session with a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {//jwt.sign imp line creates a token to identify the user securely 
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
