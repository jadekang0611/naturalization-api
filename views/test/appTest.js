const mongoose = require('mongoose');
const Card = require('../models/Card');

// Let me require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = require('chai');
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

/* -------Test the /GET route------- */
describe('/GET card', () => {
  it('it should GET all cards', (done) => {
    chai
      .request(app)
      .get('/cards')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

/* -------Test the /GET by id route------- */
// describe('/GET/:cardId', () => {
//   it('it should GET a card by the given id', (done) => {
//     let card = new Card({
//       question: 'testing question',
//       answer: 'testing answer',
//       category: 'testing category',
//     });
//     card.save((err, card) => {
//       chai
//         .request(app)
//         .get('/cards/' + card.id)
//         .send(card)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.a('object');
//           res.body.should.have.property('question');
//           res.body.should.have.property('answer');
//           res.body.should.have.property('category');
//           res.body.should.have.property('_id').equal(card.id);
//           done();
//         });
//     });
//   });
// });

/* -------Test the /POST route------- */
// describe('POST card', () => {
//   it('it should only POST if card has all fields', (done) => {
//     let card = {
//       question: 'testing question',
//       answer: 'testing answer',
//       category: 'testing category',
//     };
//     chai
//       .request(app)
//       .post('/cards')
//       .send(card)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('question');
//         res.body.should.have.property('answer');
//         res.body.should.have.property('category');
//         done();
//       });
//   });
// });

/* -------Test the /PATCH route------- */
describe('/PATCH/:cardId', () => {
  it('it should UPDATE a card given the id', (done) => {
    const cardId = '5ffbf752358780e9753aaeaf';
    chai
      .request(app)
      .patch('/cards/' + cardId)
      .send({
        question: 'Testing question',
        answer: 'Testing answer',
        category: 'Changed category',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // res.body.should.have.property('message').eql('Card updated!');
        // res.body.card.should.have.property('category').eql('Changed category');
        done();
      });
  });
});

describe('/DELETE/:cardId', () => {
  it('it should DELETE a card given the id', (done) => {
    // make sure to update a cardId (get from the DB)
    const cardId = '5ffbf7f0358780e9753aaeb2';
    chai
      .request(app)
      .delete('/cards/' + cardId)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
