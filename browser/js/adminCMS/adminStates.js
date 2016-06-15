app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/admin/', '/admin/users');

    // Register our *collections* state.
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/adminCMS/Templates/adminCMS.html'
    })
    .state('admin.users', {
        url: '/users',
        controller: 'AdminUsersCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSusers.html',
        resolve: {
            users: function(AdminFactory) {
                return AdminFactory.getAllUsers()
            },
        }
    })
    .state('admin.products', {
        url: '/products',
        controller: 'AdminProductsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSproducts.html',
        resolve: {
            products: function(ProductFactory) {
                return ProductFactory.getAllProducts()
            },
        }
    })
    .state('admin.collections', {
        url: '/collections',
        controller: 'AdminCollectionsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMScollections.html',
        resolve: {
            collections: function(ProductFactory) {
                return ProductFactory.getAllCollections()
            }
        }
    })
    .state('admin.orders', {
        url: '/orders',
        controller: 'AdminOrdersCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSorders.html',
        resolve: {
            orders: function(OrderFactory) {
                return OrderFactory.getAllOrders()
            }
        }
    })
    .state('admin.reviews', {
        url: '/reviews',
        controller: 'AdminReviewsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSReviews.html',
        resolve: {
            reviews: function(AdminFactory) {
                return AdminFactory.getAllReviews();
            }
        }
    });

});
