'use strict';

angular.module('desktopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('details', {
        url: '/card_details/:cardID',
        templateUrl: 'app/main/card_details.html',
        controller: 'MainCtrl'
      });
  });