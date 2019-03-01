import { ExpressHandler, ExpressRequest, ExpressResponse, ratingPayload } from '../interfaces/index'
import { insert, zadd, get } from '../utilities/db';


const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = async (request: ExpressRequest, response: ExpressResponse): Promise<any> => {
    const data: ratingPayload = request.body
    try {
        const key = "newsFeed::" + data.newsId
        let args: any = []; // args for zadd in redis
        args[0] = 'ratingSet' // First argument is always name of sorted set
        const feed: any = await get(key, request["dbClient"])
        /* Update rating of the feed item */
        const feedJson = JSON.parse(feed)
        let ratedData = {}
        ratedData['items'] = [];
        try {
            if (feedJson.items.length > 0) {
                feedJson.items = feedJson.items.map((el: any) => {
                    let o = Object.assign({}, el);
                    if (el.id === data.id) {
                        o.rating = data.rating;
                        ratedData['items'].push(el)
                        args.push(data.rating, JSON.stringify(ratedData))
                    }
                    return o;
                });
                const dbParams = {
                    key: key,
                    data: JSON.stringify(feedJson)
                }
                await insert(dbParams, request["dbClient"])

                /* Add rating as score with corresponding news item into a sorted set using zadd in redis
                This will help in finding top 5 rated news article later
                 */
                await zadd(args, request["dbClient"])
                sendResp(200, { message: 'FEED RATED SUCCESSFULLY' }, response)
            } else {
                sendResp(200, { message: "News does'nt exist" }, response)
            }
        }
        catch (err) {
            sendResp(404, { "message": "NewsId or item id does'nt exist or the news is expired" }, response)
        }
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }