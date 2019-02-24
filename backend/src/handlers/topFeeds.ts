import { ExpressHandler, ExpressRequest, ExpressResponse } from '../interfaces/index'

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    try {
        const args = ['ratingSet', 4, 0,];
        request['dbClient'].zrevrangebyscore(args, (err: Error, result: any) => {
            const feedsData = result.map((el: any) => {
                var o = Object.assign({}, JSON.parse(el));
                return o;
            });
            sendResp(200, { data: feedsData }, response)
        });
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }