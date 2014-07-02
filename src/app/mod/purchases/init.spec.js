describe("PurchasesRoute", function(){
	beforeEach(function(){
		module("rms");
		module('ngMockE2E');
	});

	var httpBackend, scope, purchaseController, state, stateName = 'purchases';
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			purchaseController = $controller;
			purchaseController('PurchasesController', {
				$scope: scope
			})
		}
	));

	it('should respond to URL', function(){
		expect(state.href(stateName,{})).toEqual('#/purchases');
	});

	it('should resolve data', function(){
		httpBackend.expect('GET', '../server/public/purchases').respond(200, 'done');
		httpBackend.expect('GET', 'layouts/layout-aside.tpl.html').respond(200,'done');
	 	httpBackend.expect('GET', 'mod/purchases/views/index.tpl.html').respond(200,'done');

		state.go(stateName);
		scope.$digest();
		//expect(state.current.name).toBe(stateName);
	});
})