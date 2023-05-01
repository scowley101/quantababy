import express from 'express';
import createCrud from '../middleware/airtableCrud.js';
import '../env.js';
import { authenticateToken } from '../auth/authController.js';

const router = express.Router();

// tables
const feed = process.env.TABLE_FEED;
const sleep = process.env.TABLE_SLEEP;
const nappy = process.env.TABLE_NAPPY;

// create routes for each table
function setupRoutes(tableName, routePath) {
  const crudInstance = createCrud(tableName);
  const tableRouter = express.Router();

  // tableRouter.get(
  //   '/',
  //   authenticateToken(),
  //   crudInstance.find({ filterByFormula: `{user} = '${req.user.id}'` }),
  //   (req, res) => {
  //     res.jsonp(req.result);
  //   }
  // );
  tableRouter.get(
    `${routePath}/new`,
    authenticateToken(),
    crudInstance.find(),
    (req, res) => {
      res.render('new');
    }
  );
  tableRouter.post(
    '/new',
    authenticateToken(),
    crudInstance.create({ fields: { ...req.body } }),
    (req, res) => {
      console.log('crudInstance called 💥');
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
    authenticateToken(),
    crudInstance.findOne({ filterByFormula: `{user} = '${req.user.id}'` }),
    (req, res) => {
      res.jsonp(req.result);
    }
  );
  tableRouter.put(
    '/:id',
    authenticateToken(),
    crudInstance.update({ filterByFormula: `{user} = '${req.user.id}'` }),
    (req, res) => {
      res.jsonp(req.result);
    }
  );

  return (req, res) => tableRouter(req, res);
}

// router.get('/test-auth', authenticateToken(), (req, res) => {
//   console.log('req.user:', req.user);
//   res.json({ message: 'Authenticated successfully' });
// });

router.use('/feed', authenticateToken(), setupRoutes(feed, 'feed', req));
router.use('/nappy', authenticateToken(), setupRoutes(nappy, 'nappy'));
router.use('/sleep', authenticateToken(), setupRoutes(sleep, 'sleep'));

export default router;
