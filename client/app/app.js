'use strict';

angular.module('desktopApp', [
  'desktopApp.auth',
  'desktopApp.admin',
  'desktopApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularUtils.directives.dirPagination'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
