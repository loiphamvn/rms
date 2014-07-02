describe("PurchaseController", function(){
	beforeEach(function(){
		module("rms");
	});

	var httpBackend, scope, purchaseController;
	beforeEach(inject(
		function($rootScope, $httpBackend, $controller, $state){
			state = $state;
			scope = $rootScope.$new();
			purchaseController = $controller;
			purchaseController('PurchaseController', {
				$scope: scope
			})
		}
	));
})