app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/templates/product.html',
        resolve: {
            product: function($stateParams, ProductFactory) {
                var id = $stateParams.id;
                return ProductFactory.getOneProduct(id)
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.config(function($stateProvider) {
    $stateProvider.state('product.allReviews', {
        url: '/all-reviews',
        controller: 'AllReviewsCtrl',
        parent: 'product',
        templateUrl: 'js/product/templates/all-reviews.html',
        resolve: {
            reviews: function($stateParams, ReviewFactory) {
                var id = $stateParams.id;
                return ReviewFactory.getProductReviews(id)
            }
        }
    });

});

app.config(function($stateProvider) {
    $stateProvider.state('product.addReview', {
        url: '/add-review',
        controller: 'AddReviewCtrl',
        parent: 'product',
        templateUrl: 'js/product/templates/add-review.html',
        resolve: {
            product: function($stateParams, ProductFactory) {
                var id = $stateParams.id;
                return ProductFactory.getOneProduct(id)
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();

            },
        }
    });

});