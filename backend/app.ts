import * as express from 'express';
import registerRoutes from './src/register-routes';
import { ExpressApplication } from './src/interfaces/index';


const port = 4000; // This can later be taken from config file

const app: ExpressApplication = express();

// Register all routes
registerRoutes(app);

app.listen(port, (err: Error) => {
  console.log(`Listening on ${port}`);
  if (err) {
    throw err;
  }

});
