'use strict';

angular.module('desktopApp')
.controller('MainCtrl', function ($scope, $http) {

	$scope.credit_cards = [];
	$http.get('/api/credit_cards').success(function(credit_cards) {
		$scope.credit_cards = credit_cards;
	});
	$scope.textLength = 240;
	$scope.changeLength = function(credit_card) {
		$scope.textLength = 9999;
	}
	
});
