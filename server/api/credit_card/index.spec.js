'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var creditCardCtrlStub = {
  index: 'creditCardCtrl.index',
  show: 'creditCardCtrl.show',
  create: 'creditCardCtrl.create',
  update: 'creditCardCtrl.update',
  destroy: 'creditCardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var creditCardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './credit_card.controller': creditCardCtrlStub
});

describe('CreditCard API Router:', function() {

  it('should return an express router instance', function() {
    creditCardIndex.should.equal(routerStub);
  });

  describe('GET /api/credit_cards', function() {

    it('should route to creditCard.controller.index', function() {
      routerStub.get
        .withArgs('/', 'creditCardCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/credit_cards/:id', function() {

    it('should route to creditCard.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'creditCardCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/credit_cards', function() {

    it('should route to creditCard.controller.create', function() {
      routerStub.post
        .withArgs('/', 'creditCardCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/credit_cards/:id', function() {

    it('should route to creditCard.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'creditCardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/credit_cards/:id', function() {

    it('should route to creditCard.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'creditCardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/credit_cards/:id', function() {

    it('should route to creditCard.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'creditCardCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
