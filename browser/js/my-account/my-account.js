app.config(function($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/my-account/my-account.html',
        controller: function($scope, MyAccountFactory) {
            MyAccountFactory.getMyAccount()
                .then(function(response) {
                    response.name = response.name || 'user'
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
        controller: function($scope, MyAccountFactory) {
            MyAccountFactory.getMyAccount()
                .then(function(response) {
                    $scope.orders = response.Orders;
                });
            // $scope.orders = accountInfo.Orders
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('myAccount.myReviews', {
        url: '/reviews',
        parent: 'myAccount',
        templateUrl: '/js/my-account/reviews.html',
        controller: function($scope, MyAccountFactory, ReviewFactory) {
            
            ReviewFactory.getUserReviews()
                .then(function(reviews) {
                    console.log('info from factory is', reviews)
                    $scope.reviews = reviews;
                })
        },

        data: {
            authenticate: true
        }
    });
});
