import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';


const request = supertest(app);

chai.should();

describe('Loan', () => {
  let invalidToken = 'asdasdasdsasd';

  describe('/GET Loan', () => {
    let adminToken;
    let userToken;

    before((done) => {
      const adminLoginDetails = {
        email: 'quickuser2@quick-cred.test',
        password: 'dummypass1234'
      };
      const userLoginDetails = {
        email: 'quickuser1@quick-cred.test',
        password: 'dummypass123'
      };
      request.post('/api/v1/auth/signin')
        .send(adminLoginDetails).end((err, res) => {
          ({ token: adminToken } = res.body.data);
        });
      request.post('/api/v1/auth/signin')
        .send(userLoginDetails).end((err, res) => {
          ({ token: userToken } = res.body.data);
          done();
        });
    });

    it('should return all loans', (done) => {
      request.get(`/api/v1/loans?token=${adminToken}`)
        .end((err, res) => {
          res.status.should.be.eql(200);
          done();
        });
    });

    it('should fail to return all loans when user is not admin', (done) => {
      request.get(`/api/v1/loans?token=${userToken}`)
        .end((err, res) => {
          res.status.should.be.eql(403);
          done();
        });
    });

    it('should fail to return all loans when invalid token is supplied', (done) => {
      request.get(`/api/v1/loans?token=${invalidToken}`)
        .end((err, res) => {
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('invalid token');
          done();
        });
    });

    it('should fail to return all loans when invalid token is supplied', (done) => {
      request.get('/api/v1/loans')
        .end((err, res) => {
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('no token found');
          done();
        });
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

      request.post(`/api/v1/loans`)
        .send(newLoan)
        .set('authorization', token)
        .end((err, res) => {
          res.status.should.be.eql(201);
          done(); 
        });
    });
  });
});