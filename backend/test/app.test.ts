import chai = require('chai');
import chaiHttp = require('chai-http');
import app from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing app server', () => {
    it('should return response on call', async () => {
        const res = await chai.request(app).get('/');
        expect(res.status).to.eql(200);
    })
})
