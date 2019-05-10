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
        });

      done();
    });
  });

  describe('/POST Loan', () => {
    let token;

    before((done) => {
      const loginDetails = {
        email: 'quickuser1@quick-cred.test',
        password: 'dummypass123'
      };
      request.post('/api/v1/auth/signin')
        .send(loginDetails).end((err, res) => {
          ({ token } = res.body.data);
          done();
        });
    });

    it('should create a loan', (done) => {
      const newLoan = {
        amount: '10000',
        tenor: 12
      };

      request.post(`/api/v1/loans?token=${token}`)
        .send(newLoan)
        .end((err, res) => {
          res.status.should.be.eql(201);
          done(); 
        });
    });
  });
});
