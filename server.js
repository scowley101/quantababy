import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// Import routes
import router from './routes/routes.js';

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 8080;

// Use JSON for request body
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', router);

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
