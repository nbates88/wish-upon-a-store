app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/auth/auth.html',
        controller: 'AuthCtrl'
    });

});

app.controller('AuthCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('myAccount');
        }).catch(function () {
            $scope.error = 'Hello from AuthService.login: Invalid login credentials.';
        });

    };

});