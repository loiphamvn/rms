describe("ReferralsRoute", function(){
	beforeEach(function(){
		module("rms");
		module('ngMockE2E');
	});

	var httpBackend, scope, referralController, state, stateName = 'referrals';
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			referralController = $controller;
			referralController('ReferralsController', {
				$scope: scope
			})
		}
	));

	it('should respond to URL', function(){
		expect(state.href(stateName,{})).toEqual('#/referrals');
	});

	it('should resolve data', function(){
		httpBackend.expect('GET', '../server/public/referrals').respond(200, 'done');
		httpBackend.expect('GET', 'layouts/layout-aside.tpl.html').respond(200,'done');
	 	httpBackend.expect('GET', 'mod/referrals/views/index.tpl.html').respond(200,'done');

		state.go(stateName);
		scope.$digest();
		//expect(state.current.name).toBe(stateName);
	});
})