import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import { should } from 'chai';
import supertest from 'supertest';
import app from '../app';


const request = supertest(app);

chai.should();

describe('User', () => {
  describe('/POST User', () => {
    it('should sign up a user', (done) => {
      const user = {
        firstName: 'john',
        lastName: 'doe',
        password: '12345678',
        email: 'jonmo@yahooc.com',
        address: 'jacksimpson avenue lake town'
      };

      request.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(201);
          res.body.data.firstName.should.be.eql('john');
          res.body.data.lastName.should.be.eql('doe');
        });

      done();
    });

    it('should handle validation errors when user does not supply required input', (done) => {
      const user = {
        firstName: 'john',
        lastName: 'doe',
        password: '123',
        email: 'jonmo@yahooc.com',
        address: 'jacksimpson avenue lake town'
      };

      request.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.message.should.be.eql('wrong input provided');
        });

      done();
    });
  });
});


describe('User', () => {
  describe('/POST User', () => {
    it('should sign in a user', (done) => {
      const user = {
        email: 'quickuser1@quick-cred.test',
        password: 'dummypass123',
      };

      request.post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.message.should.be.eql('login successful');
        });

      done();
    });

    it('should handle validation errors when user does not supply required input', (done) => {
      const user = {
        email: 'quickuser1@quick-cred.test',
        password: '',
      };

      request.post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.message.should.be.eql('wrong input provided');
        });

      done();
    });
  });
});

