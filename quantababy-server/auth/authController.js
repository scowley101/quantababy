import passport from 'passport';
import bcrypt, { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findOne, create } from '../models/User.js';
import '../env.js';

const register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if a user with the given email already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the email and hashed password
    const newUserPromise = create({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const newUser = await newUserPromise;

    res.status(201).json({
      message: 'User registered and logged in successfully',
      user: {
        email: newUser.email,
        userId: newUser.userId,
        recordId: newUser.recordId,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: '🙏 Email and password are required' });
  }

  try {
    const user = await findOne({ email });

    // user not found?
    if (!user) {
      return res.status(401).json({ message: '❓ Invalid email' });
    }

    // incorrect password?
    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: '🕵️‍♀️ Invalid password' });
    }

    // success!
    const payload = {
      email: user.email,
      id: user.userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      success: true,
      message: '🎉 Logged in successfully',
      user: {
        id: user.userId,
        email: user.email,
      },
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.error(err);
  }
};

const protectedRoute = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: '🔐 You are authorized',
      user: {
        email: req.user.email,
        id: req.user.userId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
};

export { register, login, protectedRoute, logout };
