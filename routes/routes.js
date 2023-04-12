import express from 'express';
import createCrud from '../middleware/airtableCrud.js'

const router = express.Router();

// Change 'Meals' to your table name
const table = createCrud('all Values');

router.get('/', table.find(), (req, res) => res.jsonp(req.result));
router.get('/new', (req, res) => res.render('new'));
router.post('/new', table.create(), (req, res) => res.jsonp(req.result));
router.get('/:id', table.findOne(), (req, res) => res.jsonp(req.result));
router.put('/:id', table.update(), (req, res) => res.jsonp(req.result));

export default router;