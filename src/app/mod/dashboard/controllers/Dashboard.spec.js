describe("DashboardController", function(){
	beforeEach(function(){
		module("rms");
	});

	var httpBackend, scope, dashboardController;
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			dashboardController = $controller;
			dashboardController('DashboardController', {
				$scope: scope
			})
		}
	));

	it('Total users must be 0', function(){
		expect(scope.total['users']).toEqual(0);
	});

	it('Total referrals must be 0', function(){
		expect(scope.total['referrals']).toEqual(0);
	});

	it('Total purchases must be 0', function(){
		expect(scope.total['purchases']).toEqual(0);
	});

	it('Total payouts must be 0', function(){
		expect(scope.total['payouts']).toEqual(0);
	});
})