import chai = require('chai');
import chaiHttp = require('chai-http');
import 'mocha';
import sinon = require("sinon");
import app from '../app';
import { getKeys, get } from '../src/utilities/db';
import { dbResp } from './stubbedData/feeds';

const sandbox = sinon.createSandbox()

chai.use(chaiHttp);
const expect = chai.expect;

const obj = {
    "getKeys": getKeys,
    "get": get
}

describe('Testing Get Feed api', () => {
    const GetFeedsApi = '/getFeeds';
    it('should return Feeds on call', async () => {
        const arg1 = 'arg1'
        const arg2 = 'arg2'
        const keys = ["newsFeed::4lhvcflbjsptbjw4"];

        /* Stubbing the database calls */
        sandbox.stub(obj, "getKeys").withArgs(arg1, arg2).resolves(keys)
        sandbox.stub(obj, "get").withArgs(arg1, arg2).resolves(dbResp)

        const res = await chai.request(app).get(GetFeedsApi);
        expect(res.status).to.eql(200);
        expect(res.body.data).to.instanceOf(Object);
    })
})