describe("DashboardRoute", function(){
	beforeEach(function(){
		module("rms");
		module('ngMockE2E');
	});

	var httpBackend, scope, dashboardController, state, stateName = 'dashboard';
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			dashboardController = $controller;
			dashboardController('DashboardController', {
				$scope: scope
			})
		}
	));

	it('should respond to URL', function(){
		//expect(state.href(stateName,{})).toEqual('#/mod/dashboard');
	});

	it('should resolve data', function(){
		/*httpBackend.expect('POST', '../server/public/users/count').respond(200, {'count':3});
	 	httpBackend.expect('POST', '../server/public/referrals/count').respond(200, {'count':3});
	 	httpBackend.expect('POST', '../server/public/purchases/count').respond(200, {'count':3});
	 	httpBackend.expect('POST', '../server/public/payouts/count').respond(200, {'count':3});

	 	httpBackend.expect('GET', 'layouts/layout-aside.tpl.html').respond(200, {'count':3});
	 	httpBackend.expect('GET', 'mod/dashboard/views/index.tpl.html').respond(200, {'count':3});

		state.go(stateName);
		scope.$digest();*/
		//expect(state.current.name).toBe(stateName);
	});
})