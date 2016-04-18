'use strict';

angular.module('desktopApp')
.controller('MainCtrl', function ($scope, $http) {
	$scope.awesomeThings = [];
	$http.get('/api/credit_cards').success(function(credit_cards) {
		$scope.credit_cards = credit_cards;
	});
});