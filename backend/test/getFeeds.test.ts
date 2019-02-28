import app from '../app';
import chai = require('chai');
// import * as chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised);
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing Get Feed api', () => {
    const GetFeedsApi = '/getFeeds';
    it('should return Feeds on call', async () => {
        const res = await chai.request(app).get(GetFeedsApi);
        expect(res.status).to.eql(200);
        expect(res.body.data).to.instanceOf(Object);
    })
})