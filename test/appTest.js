const mongoose = require('mongoose');
const Card = require('../models/Card');

// Let me require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
// My parent block
describe('Cards', () => {
  beforeEach((done) => {
    // Before each test I should empty the DB
    Card.remove({}, (err) => {
      done();
    });
  });
});

/* -------Test the /GET routes------- */
describe('/GET card', () => {
  it('it should GET all cards', (done) => {
    chai
      .request(app)
      .get('/cards')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});
