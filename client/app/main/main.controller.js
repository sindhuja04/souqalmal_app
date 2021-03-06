'use strict';

angular.module('desktopApp')
.controller('MainCtrl', function ($scope, $http, $stateParams,$state, Auth) {

	if (Auth.isLoggedIn()) {

		console.log('The user is logged IN');
		$scope.credit_cards = [];
		$('.hideLoader').show();
		$http.get('/api/credit_cards').success(function(credit_cards) {
			$scope.credit_cards = credit_cards;
			$('.hideLoader').hide();
		});

		$scope.textLength = 140;

		// Sync API Call
		$scope.reloadCc = function() {
			$('.hideLoader').show();
			$http.get('/api/credit_cards/sync').success(function(resp) {
				$http.get('/api/credit_cards').success(function(credit_cards) {
					$('.hideLoader').hide();
					$scope.credit_cards = credit_cards;
				});
			});
		}


		$scope.filter = {};
		$scope.getCreditCards = function () {
			return ($scope.credit_cards || []).map(function (credit_card) {
				return credit_card.descriptions.name;
			}).filter(function (credit_card, idx, arr) {
				return arr.indexOf(credit_card) === idx;
			});
		};

		$scope.filterByCategory = function (credit_card) {
			return $scope.filter[credit_card.descriptions.name]|| noFilter($scope.filter);
		};

		function noFilter(filterObj) {
			for (var key in filterObj) {
				if (filterObj[key]) {
					return false;
				}
			}
			return true;
		} 


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

	}
	else {
		console.log('The user is not logged IN');
		$state.go('login');

	}
});
