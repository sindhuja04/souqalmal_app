'use strict';

angular.module('desktopApp')
.controller('MainCtrl', function ($scope, $http, $stateParams,$state) {

	$scope.credit_cards = [];
	$http.get('/api/credit_cards').success(function(credit_cards) {
		$scope.credit_cards = credit_cards;
	});
	$scope.textLength = 140;


	if ($stateParams.cardID != undefined){
		$http.get('/api/credit_cards/'+$stateParams.cardID).success(function(card_detail) {
			$scope.card_detail = card_detail;
			$state.go('details');
		});
	}
	
});
