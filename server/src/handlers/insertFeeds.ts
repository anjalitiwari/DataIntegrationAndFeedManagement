import { data as config } from '../../config/data';
import { parseFeed } from '../utilities/parseRssFeed';
import { ExpressHandler, ExpressRequest, ExpressResponse, feedJson, redisParams } from '../interfaces/index';
import async = require('async');
import { insert } from '../utilities/db';

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    try {
        async.each(config.news, async (feed: string, callback: any) => {
            try {
                const dataToInsert: feedJson | {} = await parseFeed(feed);
                const dbParams: redisParams = {
                    key: 'newsFeed::' + dataToInsert["id"],
                    data: JSON.stringify(dataToInsert)
                }
                await insert(dbParams, request['dbClient']);
                callback(null);
            } catch (e) {
                callback(null) /* If unable to fetch rss feeds for one resource the loop should continue for next rss news resource */
            }
        }, () => {
            sendResp(200, { message: 'FEEDS INSERTED SUCCESSFULLY' }, response);
        });
    }
    catch (e) {
        sendResp(500, { message: 'Something went wrong' }, response);
    }
}

export { handler }