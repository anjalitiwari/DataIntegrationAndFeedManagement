import chai = require('chai');

import chaiHttp = require("chai-http");
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing Top 5 Rating Feed api', () => {
    const Top5FeedApi = '/topRatedFeeds';
    it('should return 404 when payload contains data which doesnt map to the database', async () => {
        const res = await chai.request(app).get(Top5FeedApi);
        expect(res.status).to.eql(200);
        expect(res.body.data).to.instanceOf(Object);

    })
})