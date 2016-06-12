app.config(function($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMS.html'
    });

    $stateProvider.state('admin.users', {
        url: '/users',
        controller: 'AdminUsersCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSusers.html',
        resolve: {
            users: function(AdminFactory) {
                return AdminFactory.getAllUsers()
            },
        }
    });

    $stateProvider.state('admin.products', {
        url: '/products',
        controller: 'AdminProductsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSproducts.html',
        resolve: {
            products: function(ProductFactory) {
                return ProductFactory.getAllProducts()
            },
        }
    });

    $stateProvider.state('admin.collections', {
        url: '/collections',
        controller: 'AdminCollectionsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMScollections.html',
        resolve: {
            collections: function(ProductFactory) {
                return ProductFactory.getAllCollections()
            }
        }
    });

    $stateProvider.state('admin.orders', {
        url: '/orders',
        controller: 'AdminOrdersCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSorders.html'
    });

    $stateProvider.state('admin.reviews', {
        url: '/reviews',
        controller: 'AdminReviewsCtrl',
        templateUrl: 'js/adminCMS/Templates/adminCMSreviews.html',
        resolve: {
            reviews: function(AdminFactory) {
                return AdminFactory.getAllReviews();
            }
        }
    });

});
