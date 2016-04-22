/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/page_views              ->  index
 * POST    /api/page_views              ->  create
 * GET     /api/page_views/:id          ->  show
 * PUT     /api/page_views/:id          ->  update
 * DELETE  /api/page_views/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import PageView from './page_view.model';

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

// Gets a list of PageViews
export function index(req, res) {
  return PageView.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new PageView in the DB
export function create(req, res) {
  return PageView.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
