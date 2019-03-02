const Parser = require('rss-parser');
import uniqid = require('uniqid');
import { feedJson } from '../interfaces/index';


const parseFeed = (feedData: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let parser = new Parser();
            let feed = await parser.parseURL(feedData);

            /* Insert one more field rating for every item */
            const result = feed.items.map((el: any) => {
                var o = Object.assign({}, el);
                o.rating = 0;
                o.id = uniqid();
                return o;
            });
            const feedJson: feedJson = {
                'id': uniqid(),
                'feedUrl': feed.feedUrl,
                'image': feed.image,
                'title': feed.title,
                'description': feed.description,
                'link': feed.link,
                'items': result

            }
            return resolve(feedJson);
        }
        catch (error) {
            return reject("Unable to parse Rss feed");
        }

    });
};

export { parseFeed }