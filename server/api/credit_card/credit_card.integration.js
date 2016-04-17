'use strict';

var app = require('../..');
import request from 'supertest';

var newCreditCard;

describe('CreditCard API:', function() {

  describe('GET /api/credit_cards', function() {
    var creditCards;

    beforeEach(function(done) {
      request(app)
        .get('/api/credit_cards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          creditCards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      creditCards.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/credit_cards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/credit_cards')
        .send({
          name: 'New CreditCard',
          info: 'This is the brand new creditCard!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCreditCard = res.body;
          done();
        });
    });

    it('should respond with the newly created creditCard', function() {
      newCreditCard.name.should.equal('New CreditCard');
      newCreditCard.info.should.equal('This is the brand new creditCard!!!');
    });

  });

  describe('GET /api/credit_cards/:id', function() {
    var creditCard;

    beforeEach(function(done) {
      request(app)
        .get('/api/credit_cards/' + newCreditCard._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          creditCard = res.body;
          done();
        });
    });

    afterEach(function() {
      creditCard = {};
    });

    it('should respond with the requested creditCard', function() {
      creditCard.name.should.equal('New CreditCard');
      creditCard.info.should.equal('This is the brand new creditCard!!!');
    });

  });

  describe('PUT /api/credit_cards/:id', function() {
    var updatedCreditCard;

    beforeEach(function(done) {
      request(app)
        .put('/api/credit_cards/' + newCreditCard._id)
        .send({
          name: 'Updated CreditCard',
          info: 'This is the updated creditCard!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCreditCard = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCreditCard = {};
    });

    it('should respond with the updated creditCard', function() {
      updatedCreditCard.name.should.equal('Updated CreditCard');
      updatedCreditCard.info.should.equal('This is the updated creditCard!!!');
    });

  });

  describe('DELETE /api/credit_cards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/credit_cards/' + newCreditCard._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when creditCard does not exist', function(done) {
      request(app)
        .delete('/api/credit_cards/' + newCreditCard._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
