import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './env.js';
// Import routes
import router from './routes/routes.js';
// auth
import passport from 'passport';
import session from 'express-session';
import passportConfig from './passportConfig.js';
import authRouter from './auth/authRoutes.js';

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
  })
);

// Initialize Passport and configure it with the local strategy
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use JSON for request body
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Use routes
app.use('/', router);
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

