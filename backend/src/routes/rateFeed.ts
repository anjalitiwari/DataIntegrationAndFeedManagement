import { handler as rate } from '../handlers/rateFeeds';
import { ExpressApplication } from '../interfaces/index';

function rateFeeds(app: ExpressApplication): void {
  app.post('/rateFeed', rate);
}
export default rateFeeds;

