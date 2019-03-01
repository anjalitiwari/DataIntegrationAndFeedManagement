import { ExpressHandler, ExpressRequest, ExpressResponse, feedJson } from '../interfaces/index';
import async = require('async');
import { getKeys, get } from '../utilities/db';

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = async (request: ExpressRequest, response: ExpressResponse) => {
    try {
        let feedsData: feedJson[] = [];
        /* Fetching all the keys matching pattern newsFeed::* stored in redis*/
        let result: any = await getKeys("newsFeed::*", request['dbClient'])
        async.each(result, async (key, callback) => {
            /* Fetching the data for each key*/
            const feed: any = await get(key, request['dbClient'])
            feedsData.push(JSON.parse(feed))
            callback()
        }, () => {
            sendResp(200, { data: feedsData }, response)
        });
        // });
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }