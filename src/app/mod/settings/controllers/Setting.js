angular.module("rms.mod.settings.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
])

.controller("SettingsController", function ($scope, CommonApi, $modal, $state) {
    $scope.referral_types = [
        {'id':1, 'name':'$ (fixed number)'},
        {'id':2, 'name':'% (percentage)'}
    ];

    $scope.settings = {
        'minimum_purchase': 0,
        'referral_type': 1,
        'referral_waiting': 30 
    }



    /*$scope.total = {
        'users': 0,
        'referrals': 0,
        'purchases': 0,
        'payouts': 0
    }

    CommonApi.post("users/count",{}).then(function(count){
        $scope.total.users = count.data.count;
    });

    CommonApi.post("referrals/count",{}).then(function(count){
        $scope.total.referrals = count.data.count;
    });

    CommonApi.post("purchases/count",{}).then(function(count){
        $scope.total.purchases = count.data.count;
    });

    CommonApi.post("payouts/count",{}).then(function(count){
        $scope.total.payouts = count.data.count;
    });*/
});