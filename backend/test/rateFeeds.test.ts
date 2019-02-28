import app from '../app';
import chai = require('chai');
import chaiHttp = require('chai-http');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing Rate Feed api', () => {
    const RateFeedApi = '/rateFeed';
    const rateFeedApiInvalidPayload = {
        "newsId": "3xlz8kcbjsirc01p",
        "id": "3xlz8kcbjsirc015",
        "rating": 4
    }

    it('should return 404 when payload contains data which doesnt map to the database', async () => {
        const res = await chai.request(app).post(RateFeedApi).send(rateFeedApiInvalidPayload);
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql("NewsId or item id does'nt exist or the news is expired");
    })
})