import { handler as get } from '../handlers/getFeeds';
import { ExpressApplication } from '../interfaces/index';

function getFeeds(app: ExpressApplication): void {
  app.get('/getFeeds', get);
}
export default getFeeds;

