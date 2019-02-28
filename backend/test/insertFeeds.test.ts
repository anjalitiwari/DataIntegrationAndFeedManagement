import app from '../app';
import chai = require('chai');


import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;



describe('Testing Insert Feed api', () => {
    const insertFeedsApi = '/insertFeeds';
    it('should return response on call', async () => {
        const res = await chai.request(app).post(insertFeedsApi);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('FEEDS INSERTED SUCCESSFULLY');
    })
})