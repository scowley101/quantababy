import express from 'express';
import airtableCheck from './airtable/airtable.js';
// Import routes
import {tshirtRoutes} from './routes/tshirtRoutes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

// Use routes
app.use(tshirtRoutes);

app.listen(PORT, () => 
{
    airtableCheck();
console.log(`⚡ Its alive on http://localhost:${PORT}`)
}
);
