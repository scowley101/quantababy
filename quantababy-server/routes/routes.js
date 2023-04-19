import express from 'express';
import createCrud from '../middleware/airtableCrud.js';
import '../env.js';

const router = express.Router();

// tables
const feed = process.env.TABLE_FEED;
const sleep = process.env.TABLE_SLEEP;
const nappy = process.env.TABLE_NAPPY;

// Middleware that requires authentication
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// create routes for each table
function setupRoutes(tableName, routePath, req) {
  console.log('req', req);
  const crudInstance = createCrud(tableName, req.user.id);
  const tableRouter = express.Router();

  tableRouter.get(
    '/',
    requireAuth,
    crudInstance.find({ filterByFormula: `{user} = '${req.user.id}'` }),
    (req, res) => {
      res.jsonp(req.result);
    }
  );
  tableRouter.get('/new', requireAuth, (req, res) => {
    res.render('new');
  });
  tableRouter.post(
    '/new',
    requireAuth,
    crudInstance.create({ fields: { user: req.user.id, ...req.body } }),
    (req, res) => {
      // extract the record id from the response
      const recordId = req.result?.getId();
      // check if the record id exists and return it in the response
      if (recordId) {
        res.jsonp({ 'request-result': req.result, id: recordId });
      } else {
        res.jsonp({ 'request-result': req.result });
      }
    }
  );
  tableRouter.get(
    '/:id',
    requireAuth,
    crudInstance.findOne({ filterByFormula: `{user} = '${req.user.id}'` }),
    (req, res) => {
      res.jsonp(req.result);
    }
  );
  tableRouter.put(
    '/:id',
    requireAuth,
    crudInstance.update({ filterByFormula: `{user} = '${req.user.id}'` }),
    (req, res) => {
      res.jsonp(req.result);
    }
  );

  return tableRouter;
}

router.use('/feed', (req, res) => setupRoutes(feed, 'feed', req));
router.use('/nappy', (req, res) => setupRoutes(nappy, 'nappy', req));
router.use('/sleep', (req, res) => setupRoutes(sleep, 'sleep', req));

export default router;
