// this is the server for the jwt-auth branch

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './env.js';

// import auth
import cors from 'cors';
import authRouter from './auth/authRoutes.js';

// Import routes
import router from './routes/routes.js';

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 8080;

// Use JSON for request body
app.use(express.json());

// Use urlencoded for request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Use routes
app.use('/api', router);
app.use('/api/auth', authRouter);

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
