import chai = require('chai');
import chaiHttp = require('chai-http');
import sinon = require("sinon");
import app from '../app';
import { insert } from '../src/utilities/db';


const sandbox = sinon.createSandbox()

chai.use(chaiHttp);
const expect = chai.expect;

const obj = {
    "insert": insert,
}

describe('Testing Insert Feed api', () => {
    const insertFeedsApi = '/insertFeeds';
    it('should return response on call', async () => {

        const arg1 = 'arg1'
        const arg2 = 'arg2'

        /* Stubbing the database calls */
        sandbox.stub(obj, "insert").withArgs(arg1, arg2).resolves(1)

        const res = await chai.request(app).post(insertFeedsApi);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('FEEDS INSERTED SUCCESSFULLY');
    })
})