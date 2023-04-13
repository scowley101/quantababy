import '../env.js';
import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE;

Airtable.configure({ apiKey });
const base = Airtable.base(baseId);

export default base;
