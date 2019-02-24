import bodyParser = require("body-parser");

// Routes
import getFeeds from '../src/routes/getFeeds';
import insertFeeds from '../src/routes/importFeedsIntodb';
import rateFeeds from '../src/routes/rateFeed';
import topRatedFeeds from '../src/routes/topRatedFeeds';

// Interfaces
import { ExpressApplication } from '../src/interfaces/index';

//Middlewares
import { middlewareWrapper } from './middlewares/json-response-header';
import { middlewareDBWrapper } from './middlewares/setDbConnectionObj';
import cors = require("cors");


const registerRoutes = (app: ExpressApplication): void => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  middlewareDBWrapper(app);
  middlewareWrapper(app);

  // Register all the routes
  getFeeds(app);
  insertFeeds(app);
  rateFeeds(app);
  topRatedFeeds(app);
}

export default registerRoutes;
