'use strict';

var express = require('express');
var controller = require('./credit_card.controller');

var router = express.Router();

// Base API call for index action.
router.get('/', controller.index);
// This API route is used for syncing the credit cards model.
router.get('/sync', controller.sync_credit_cards);


module.exports = router;
