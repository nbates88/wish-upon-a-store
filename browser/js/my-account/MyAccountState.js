app.config(function($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/my-account/templates/my-account.html',
        controller: 'MyAccountCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        },
        resolve: {
            accountInfo: function(MyAccountFactory) {
                return MyAccountFactory.getMyAccount()
            }
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('myAccount.myOrders', {
        url: '/orders',
        parent: 'myAccount',
        templateUrl: '/js/my-account/templates/my-orders.html',
        controller: 'MyOrdersCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            orders: function(MyAccountFactory) {
                return MyAccountFactory.getMyOrders()
            }
        }
    });
});


app.config(function($stateProvider) {
    $stateProvider.state('myAccount.editAccount', {
        url: '/edit',
        parent: 'myAccount',
        templateUrl: '/js/my-account/templates/edit-account.html',
        controller: 'EditAccountCtrl',
        data: {
            authenticate: true
        }
    })
});

app.config(function($stateProvider) {
    $stateProvider.state('myAccount.myReviews', {
        url: '/reviews',
        parent: 'myAccount',
        templateUrl: '/js/my-account/templates/my-reviews.html',
        controller: 'MyReviewsCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            reviews: function(ReviewFactory) {
                return ReviewFactory.getUserReviews();
            },
        }
    });
});
