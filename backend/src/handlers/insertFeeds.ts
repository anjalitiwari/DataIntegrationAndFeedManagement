import { data as config } from '../../config/data';
import { parseFeed } from '../utilities/parseRssFeed';
import { ExpressHandler, ExpressRequest, ExpressResponse, feedJson } from '../interfaces/index';
import async = require('async');

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    try {
        async.each(config.news, async (feed: string, callback: any) => {
            const dataToInsert: feedJson | {} = await parseFeed(feed);
            console.log("Inserted news feed -> ", 'newsFeed::' + dataToInsert["id"])
            request['dbClient'].set('newsFeed::' + dataToInsert["id"], JSON.stringify(dataToInsert), (err: Error) => {
                if (err) throw new Error("Error:" + err);
                callback(null);
            });
        }, () => {
            sendResp(200, { message: 'FEEDS INSERTED SUCCESSFULLY' }, response);
        });
    } catch (e) {
        sendResp(500, { message: 'Something went wrong' }, response);

    }
}

export { handler }