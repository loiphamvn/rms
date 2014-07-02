describe("UsersRoute", function(){
	beforeEach(function(){
		module("rms");
		module('ngMockE2E');
	});

	var httpBackend, scope, userController, state, stateName = 'users';
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			userController = $controller;
			userController('UsersController', {
				$scope: scope
			})
		}
	));

	it('should respond to URL', function(){
		expect(state.href(stateName,{})).toEqual('#/users');
	});

	it('should resolve data', function(){
		httpBackend.expect('GET', '../server/public/users').respond(200, 'done');
		httpBackend.expect('GET', 'layouts/layout-aside.tpl.html').respond(200,'done');
	 	httpBackend.expect('GET', 'mod/users/views/index.tpl.html').respond(200,'done');

		state.go(stateName);
		scope.$digest();
		//expect(state.current.name).toBe(stateName);
	});
})