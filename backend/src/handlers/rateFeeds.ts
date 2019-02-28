import { ExpressHandler, ExpressRequest, ExpressResponse, ratingPayload } from '../interfaces/index'

const sendResp = (statusCode: number, data: any, response: ExpressResponse) => {
    return response.status(statusCode).send(data);
}

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    const data: ratingPayload = request.body
    console.log(data)
    try {
        const key = "newsFeed::" + data.newsId
        let args: any = []; // args for zadd in redis
        args[0] = 'ratingSet' // First argument is always name of sorted set

        request['dbClient'].get(key, (err: Error, feed: any) => {
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
                    request['dbClient'].set(key, JSON.stringify(feedJson), (err: Error, feed: any) => {
                        /* Add rating as score with corresponding news item into a sorted set using zadd in redis
                        This will help in finding top 5 rated news article later
                         */
                        request['dbClient'].zadd(args, (err: Error, result: any) => {
                            sendResp(200, { message: 'FEED RATED SUCCESSFULLY' }, response)
                        });
                    });
                }
            }
            catch (err) {
                sendResp(404, { "message": "NewsId or item id does'nt exist or the news is expired" }, response)
            }
        });
    } catch (err) {
        sendResp(500, err, response)

    }
}

export { handler }