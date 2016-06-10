let formatDate = function(rawDateString) {
    let date = rawDateString.slice(0, 10).split('-');
    let months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };
    return `${months[date[1]]} ${date[2]}, ${date[0]}`;
}

app.config(function($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/my-account/my-account.html',
        controller: function($scope, MyAccountFactory) {
            MyAccountFactory.getMyAccount()
                .then(function(response) {
                    $scope.accountInfo = response;
                });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('myAccount.myOrders', {
        url: '/my-orders',
        parent: 'myAccount',
        templateUrl: '/js/my-account/my-orders.html',
        controller: function($scope, MyAccountFactory) {

            MyAccountFactory.getMyAccount()
                .then(function(response) {
                    response.Orders.forEach(order => {
                        order._createdAt = formatDate(order._createdAt);
                        order._updatedAt = formatDate(order._updatedAt);
                    });
                    $scope.orders = response.Orders
                });


        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        },
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('myAccount.editAccount', {
        url: '/edit-account',
        parent: 'myAccount',
        templateUrl: '/js/my-account/edit-account.html',
        controller: function($scope, $http, Session, $rootScope, AUTH_EVENTS, $q, MyAccountFactory, AuthService) {

            MyAccountFactory.getMyAccount()
                .then(function(account) {
                    $scope.orders = account.Orders;
                    $scope.email = account.email;
                });
            
            $scope.submit = function(newpassword) {
                console.log("$scope.submit new password: ", newpassword);
                
                return $http.put('/login', {newpassword: newpassword})
                .then(function(response) {
                    return $scope.message = response.data.message;
                })
                .catch(function() {
                    return $q.reject({ message: 'Invalid login credentials.' });
            });
    };
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });
});
