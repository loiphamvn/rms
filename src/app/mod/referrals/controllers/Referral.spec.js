describe("ReferralController", function(){
	beforeEach(function(){
		module("rms");
	});

	var httpBackend, scope, referralController;
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			referralController = $controller;
			referralController('ReferralController', {
				$scope: scope
			})
		}
	));
})