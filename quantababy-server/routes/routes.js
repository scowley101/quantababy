import express from 'express';
import createCrud from '../middleware/airtableCrud.js';
import '../env.js';

const router = express.Router();

// tables
const feed = process.env.TABLE_FEED;
const sleep = process.env.TABLE_SLEEP;
const nappy = process.env.TABLE_NAPPY;


// create routes for each table
function setupRoutes(tableName, routePath) {
  const crudInstance = createCrud(tableName);
  router.get(`/${routePath}/`, crudInstance.find(), (req, res) =>
    res.jsonp(req.result)
  );
  router.get(`/${routePath}/new`, (req, res) => res.render('new'));
  router.post(`/${routePath}/new`, crudInstance.create(), (req, res) => {
  // extract the record id from the response
    const recordId = req.result?.getId();  
// check if the record id exists and return it in the response
if (recordId) {
  res.jsonp({ "request-result": req.result, "id": recordId });
} else {
  res.jsonp({ "request-result": req.result });
}
});
  router.get(`/${routePath}/:id`, crudInstance.findOne(), (req, res) =>
    res.jsonp(req.result)
  );
  router.put(`/${routePath}/:id`, crudInstance.update(), (req, res) =>
    res.jsonp(req.result)
  );
}

setupRoutes(feed, 'feed');
setupRoutes(nappy, 'nappy');
setupRoutes(sleep, 'sleep');

export default router;
