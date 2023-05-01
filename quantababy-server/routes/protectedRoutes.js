import express from 'express';
import createCrud from '../middleware/airtableCrud.js';
import '../env.js';
import { authenticateToken } from '../auth/authController.js';

const protectedRouter = express.Router();

// tables
const feed = process.env.TABLE_FEED;
const feedStart = process.env.TABLE_FEED_START;
const feedStop = process.env.TABLE_FEED_STOP;
const sleep = process.env.TABLE_SLEEP;

// create routes for each table
function setupRoutes(tableName, routePath) {
  const crudInstance = createCrud(tableName);
  protectedRouter.get(
    `/${routePath}/`,
    authenticateToken(),
    crudInstance.find(),
    (req, res) => res.jsonp(req.result)
  );
  protectedRouter.get(`/${routePath}/new`, (req, res) => res.render('new'));
  protectedRouter.post(
    `/${routePath}/new`,
    authenticateToken(),
    crudInstance.create(),
    (req, res) => res.jsonp(req.result)
  );
  protectedRouter.get(
    `/${routePath}/:id`,
    authenticateToken(),
    crudInstance.findOne(),
    (req, res) => res.jsonp(req.result)
  );
  protectedRouter.put(
    `/${routePath}/:id`,
    authenticateToken(),
    crudInstance.update(),
    (req, res) => res.jsonp(req.result)
  );
}

setupRoutes(feed, 'feed');
setupRoutes(feedStart, 'feed-start');
setupRoutes(feedStop, 'feed-stop');
setupRoutes(sleep, 'sleep');

export default protectedRouter;
