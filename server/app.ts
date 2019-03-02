import * as express from 'express';
import registerRoutes from './src/register-routes';
import { ExpressApplication } from './src/interfaces/index';
import { data as config } from './config/data';


const port = config.port; // This is taken from config file

const app: ExpressApplication = express();

// Register all routes with middlewares and db connection
registerRoutes(app);

app.listen(port, (err: Error) => {
  console.log(`Listening on ${port}`);
  if (err) {
    throw err;
  }
});

export default app
