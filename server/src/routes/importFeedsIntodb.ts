import { handler as insert } from '../handlers/insertFeeds';
import { ExpressApplication } from '../interfaces/index';

function insertFeeds(app: ExpressApplication): void {
    app.post('/insertFeeds', insert);
}
export default insertFeeds;

