import passport from 'passport';
import bcrypt from 'bcrypt';
import { findOne, create } from '../models/User.js';

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, email and password are required' });
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
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const newUser = await newUserPromise;

    // Log the user in
    req.logIn(newUser, (err) => {
      if (err) return next(err);
      return res
        .status(201)
        .json({ message: 'User registered and logged in successfully' });
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ user });
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
};

export { register, login, logout };
