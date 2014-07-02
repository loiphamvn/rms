describe("PayoutController", function(){
	beforeEach(function(){
		module("rms");
	});

	var httpBackend, scope, payoutController;
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			dashboardController = $controller;
			dashboardController('PayoutController', {
				$scope: scope
			})
		}
	));

	
})