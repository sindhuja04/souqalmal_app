/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/credit_cards              ->  index
 * POST    /api/credit_cards              ->  create
 * GET     /api/credit_cards/:id          ->  show
 * PUT     /api/credit_cards/:id          ->  update
 * DELETE  /api/credit_cards/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import CreditCard from './credit_card.model';

 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
    .then(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of CreditCards
export function index(req, res) {
  return CreditCard.find().exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// This action perform sync operation.
// 
export function sync_credit_cards(req, res) {
  var request = require('request');
  var sync_api_uri = 'https://www.souqalmal.com/api/product?apiCountry=ae&apiLanguage=en&categoryId=543857a388de100000ae90bb&categoryName=credit-cards&filter=%7B%22category%22:%22credit-cards%22,%22userSalary%22:%220%22%7D&limit=25&order=false&pageNum=1&skip=0'
  request(sync_api_uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // API DATA available here....
      console.log("API Data received......")
      var result = JSON.parse(body);
      // Store credit card info to Model
      for (var i = 0; i < result['data']['data'].length; i++){
        // TODO add a conditional check for repeating data
        var credit_card_uuid = result['data']['data'][i]['_id']
        var descriptions = result['data']['data'][i]['descriptions']
        var image_url = result['data']['data'][i]['imageUrl']

        // Creates a CC record
        CreditCard.create({ credit_card_uuid: credit_card_uuid, descriptions: descriptions, image_url: image_url})
       
      }
      res.send(200)
    }  
  })
}