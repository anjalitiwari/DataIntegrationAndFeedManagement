import { ExpressApplication, ExpressMiddleware, ExpressRequest, ExpressResponse } from '../interfaces/index';
import { NextFunction } from 'connect';

const middlewareWrapper = (app: ExpressApplication): void => {
  const middleware: ExpressMiddleware = (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  };
  app.use(middleware);
}

export { middlewareWrapper };
