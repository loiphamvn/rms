describe("PayoutsRoute", function(){
	beforeEach(function(){
		module("rms");
		module('ngMockE2E');
	});

	var httpBackend, scope, payoutController, state, stateName = 'payouts';
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			payoutController = $controller;
			payoutController('PayoutsController', {
				$scope: scope
			})
		}
	));

	it('should respond to URL', function(){
		expect(state.href(stateName,{})).toEqual('#/payouts');
	});

	it('should resolve data', function(){
		httpBackend.expect('GET', '../server/public/payouts').respond(200, 'done');
		httpBackend.expect('GET', 'layouts/layout-aside.tpl.html').respond(200,'done');
	 	httpBackend.expect('GET', 'mod/payouts/views/index.tpl.html').respond(200,'done');

		state.go(stateName);
		scope.$digest();
		//expect(state.current.name).toBe(stateName);
	});
})