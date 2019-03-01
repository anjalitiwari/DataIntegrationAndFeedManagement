import chai = require('chai');
import chaiHttp = require('chai-http');
import sinon = require("sinon");
import app from '../app';
import 'mocha';
import { zrevrangeByScore } from '../src/utilities/db';
import { dbResp } from './stubbedData/feeds';

const sandbox = sinon.createSandbox()

chai.use(chaiHttp);
const expect = chai.expect;

const obj = {
    "zrevrangeByScore": zrevrangeByScore,
}

describe('Testing Top 5 Rating Feed api', () => {
    const Top5FeedApi = '/topRatedFeeds';
    it('should return top 5 feeds', async () => {
        const arg1 = ['ratingSet', 5, 0, 'LIMIT', 0, 4];
        const arg2= 'arg2'

        /* Stubbing the database calls */
        sandbox.stub(obj, "zrevrangeByScore").withArgs(arg1,arg2).resolves(dbResp)

        const res = await chai.request(app).get(Top5FeedApi);
        expect(res.status).to.eql(200);
        expect(res.body.data).to.instanceOf(Object);

    })
})