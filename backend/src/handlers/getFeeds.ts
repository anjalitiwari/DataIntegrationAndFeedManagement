import { ExpressHandler, ExpressRequest, ExpressResponse, feedJson } from '../interfaces/index';
import async = require('async');

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    try {
        let feedsData: feedJson[] = [];
        /* Fetching all the keys matching pattern newsFeed::* stored in redis*/
        request['dbClient'].keys("newsFeed::*", (err: Error, result: any) => {
            async.each(result, (key, callback) => {
                /* Fetching the data for each key*/
                request['dbClient'].get(key, (err: Error, feed: any) => {
                    feedsData.push(JSON.parse(feed))
                    callback()
                });
            }, () => {
                sendResp(200, { data: feedsData }, response)
            });
        });
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }