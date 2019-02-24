import { ExpressApplication, ExpressMiddleware, ExpressRequest, ExpressResponse } from '@interfaces/index';
import { NextFunction } from 'connect';

// Get dbConnection 
import { connectToDB } from '../db';

const middlewareDBWrapper = (app: ExpressApplication): void => {
    const middlewareDBWrapper: ExpressMiddleware = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
        req['dbClient'] = await connectToDB()
        next();
    };
    app.use(middlewareDBWrapper);
}

export { middlewareDBWrapper };



