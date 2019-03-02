import { handler as topFeeds } from '../handlers/topFeeds';
import { ExpressApplication } from '../interfaces/index';

function topRatedFeeds(app: ExpressApplication): void {
  app.get('/topRatedFeeds', topFeeds);
}
export default topRatedFeeds;

