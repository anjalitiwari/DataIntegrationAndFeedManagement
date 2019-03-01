import app from '../app';
import chai = require('chai');
import chaiHttp = require('chai-http');
import sinon = require("sinon");
import { insert, get, zadd } from '../src/utilities/db';
import { dbResp } from './stubbedData/feeds';

chai.use(chaiHttp);
const expect = chai.expect;

const stubObj = {
    "insert": insert,
    "get": get,
    "zadd": zadd
}

describe('Testing Rate Feed api', () => {
    const RateFeedApi = '/rateFeed';
    const rateFeedApiInvalidPayload = {
        "newsId": "3xlz8kcbjsirc01p",
        "id": "3xlz8kcbjsirc015",
        "rating": 4
    }

    it('should return 404 when payload contains data which doesnt map to the database', async () => {
        const arg1 = 'arg1'
        const arg2 = 'arg2'
        const arg3 = ["rating"]

        /* Stubbing the database calls */
        sinon.stub(stubObj, "get").withArgs(arg1, arg2).resolves(dbResp)
        sinon.stub(stubObj, "insert").withArgs(arg1, arg2).resolves(1)
        sinon.stub(stubObj, "zadd").withArgs(arg3, arg2).resolves(dbResp)

        const res = await chai.request(app).post(RateFeedApi).send(rateFeedApiInvalidPayload);
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql("NewsId or item id does'nt exist or the news is expired");
    })
})