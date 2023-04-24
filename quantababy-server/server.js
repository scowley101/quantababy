import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './env.js';
// auth
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import passportConfig from './passportConfig.js';
import authRouter from './auth/authRoutes.js';
// Import routes
import router from './routes/routes.js';

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 8080;

// Configure Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // session will expire after 30 days
      httpOnly: true, // set the httpOnly flag to prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // set the secure flag to true in production
      sameSite: 'strict', // set the sameSite attribute to strict to prevent CSRF attacks
    },
  })
);

// configure cors middleware
app.use(cors());

// Initialize Passport and configure it with the local strategy
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// Use JSON for request body
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Use routes
app.use('/api', router);
app.use('/auth', authRouter);

const startApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`⚡ Its alive on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startApp();
