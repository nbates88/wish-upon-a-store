app.config(function($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/my-account/my-account.html',
        controller: function($scope, MyAccountFactory) {
            MyAccountFactory.getMyAccount()
                .then(function(accountInfo) {
                    $scope.accountInfo = accountInfo;
                });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('MyAccountFactory', function($http) {

    var getMyAccount = function() {
        return $http.get('/api/members/myaccount').then(function(response) {
            console.log('data retrieved:', response.data)
            return response.data;
        });
    };

    return {
        getMyAccount: getMyAccount
    };

});
