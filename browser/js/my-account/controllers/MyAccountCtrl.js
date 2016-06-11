app.controller('MyAccountCtrl', function($scope, MyAccountFactory) {
    MyAccountFactory.getMyAccount()
        .then(function(response) {
            response.name = response.name || 'user'
            $scope.accountInfo = response;
        });
})
