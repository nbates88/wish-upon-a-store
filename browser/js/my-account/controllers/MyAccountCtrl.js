app.controller('MyAccountCtrl', function($scope, MyAccountFactory) {
    MyAccountFactory.getMyAccount()
        .then(function(response) {
        	// EI: above, instead of response you should put 'account'
            response.name = response.name || 'user'
            $scope.accountInfo = response;
        });
})
