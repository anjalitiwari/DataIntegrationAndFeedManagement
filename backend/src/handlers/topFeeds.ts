import { ExpressHandler, ExpressRequest, ExpressResponse } from '../interfaces/index'
import { zrevrangeByScore } from '../utilities/db';


const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = async (request: ExpressRequest, response: ExpressResponse) => {
    try {
        const offset = 0;
        const count = 5;
        const args = ['ratingSet', 5, 0, 'LIMIT', offset, count]; // zrevrangebyscore arguments

        const result: any = await zrevrangeByScore(args, request["dbClient"])
        const topFeeds = result.map((el: any) => {
            var o = Object.assign({}, JSON.parse(el));
            return o;
        });
        sendResp(200, { data: topFeeds }, response)
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }