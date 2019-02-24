import { Request, Response, NextFunction, RequestHandler, Application } from 'express';
type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;

export { Response as ExpressResponse, Request as ExpressRequest, ExpressMiddleware, RequestHandler as ExpressHandler, Application as ExpressApplication }


export interface newsFeed {
    news: [string];
}

export interface feedJson {
    id: string;
    feedUrl: string,
    image: string,
    title: string,
    description: string,
    link: string,
    items: [Object]
}

export interface ratingPayload {
    newsId: string;
    id:string;
    rating: number;
}
