'use strict';

angular.module('desktopApp.auth', [
  'desktopApp.constants',
  'desktopApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
