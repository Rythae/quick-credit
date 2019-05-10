import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import { should } from 'chai';
import supertest from 'supertest';
import app from '../app';


const request = supertest(app);

chai.should();

describe('Loan', () => {
  describe('/GET Loan', () => {
    it('should return all loans', (done) => {
      request.get('/api/v1/loans')
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.message.should.be.eql('Loans returned successfully');
        });

      done();
    });
  });
});
    

    