import express from 'express';
import createCrud from '../middleware/airtableCrud.js';
import '../env.js';

const router = express.Router();

// tables
const feed = process.env.TABLE_FEED;
const feedStart = process.env.TABLE_FEED_START;
const feedStop = process.env.TABLE_FEED_STOP;
const sleep = process.env.TABLE_SLEEP;

// create routes for each table
function setupRoutes(tableName, routePath) {
  const crudInstance = createCrud(tableName);
  router.get(`/${routePath}/`, crudInstance.find(), (req, res) =>
    res.jsonp(req.result)
  );
  router.get(`/${routePath}/new`, (req, res) => res.render('new'));
  router.post(`/${routePath}/new`, crudInstance.create(), (req, res) =>
    res.jsonp(req.result)
  );
  router.get(`/${routePath}/:id`, crudInstance.findOne(), (req, res) =>
    res.jsonp(req.result)
  );
  router.put(`/${routePath}/:id`, crudInstance.update(), (req, res) =>
    res.jsonp(req.result)
  );
}

setupRoutes(feed, 'feed');
setupRoutes(feedStart, 'feed-start');
setupRoutes(feedStop, 'feed-stop');
setupRoutes(sleep, 'sleep');

export default router;
