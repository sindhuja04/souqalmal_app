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
			if ($scope.card_detail.descriptions.typeSpecificData.minSalary != undefined) {
				$scope.minSalary = $scope.card_detail.descriptions.typeSpecificData.minSalary;
			}
			else {
				$scope.minSalary = 'No';
			}
			if ($scope.card_detail.descriptions.typeSpecificData.cashBack != undefined) {
				$scope.cashBack = 'Yes';
			}
			else {
				$scope.cashBack = 'No';	
			}
			$state.go('details');



		});

	}
	
});
