describe("UserController", function(){
	beforeEach(function(){
		module("rms");
	});

	var httpBackend, scope, userController;
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			userController = $controller;
			userController('UserController', {
				$scope: scope
			})
		}
	));
})