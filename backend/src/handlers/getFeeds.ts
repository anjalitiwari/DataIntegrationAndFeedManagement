import { ExpressHandler, ExpressRequest, ExpressResponse, feedJson } from '../interfaces/index'
import async = require('async');

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    try {
        let feedsData: feedJson[] = [];
        request['dbClient'].keys("newsFeed::*", (err: Error, result: any) => {
            async.each(result, (key, callback) => {
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