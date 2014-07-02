angular.module("rms.mod.dashboard.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
])

.controller("DashboardController", function ($scope, CommonApi, $modal, $state) {
    $scope.total = {
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
    });
});