app.controller('EditAccountCtrl', function($scope, $http, Session, $rootScope, AUTH_EVENTS, $q, MyAccountFactory, AuthService) {

    // EI: should be in a resolve block instead of the controller, for all these my-account controllers
    MyAccountFactory.getMyAccount()
        .then(function(account) {
            $scope.orders = account.Orders;
            $scope.email = account.email;
        });

    $scope.submit = function(newpassword) {
        console.log("$scope.submit new password: ", newpassword);

        return $http.put('/login', { newpassword: newpassword })
            .then(function(response) {
                return $scope.message = response.data.message;
            })
            .catch(function() {
                return $q.reject({ message: 'Invalid login credentials.' });
            });
    };

})
