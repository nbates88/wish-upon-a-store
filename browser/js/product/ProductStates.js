app.config(function($stateProvider) {

    $stateProvider.state('product', {
            url: '/products/:id',
            controller: 'ProductCtrl',
            templateUrl: 'js/product/templates/product.html',
            // abstract: true,
            resolve: {
                product: function($stateParams, ProductFactory) {
                    var id = $stateParams.id;
                    return ProductFactory.getOneProduct(id)
                },
                user: function(AuthService) {
                    return AuthService.getLoggedInUser();

                }
            }
        })
        .state('product.allReviews', {
            url: '/all-reviews',
            controller: 'AllReviewsCtrl',
            // parent: 'product',
            templateUrl: 'js/product/templates/all-reviews.html',
            resolve: {
                reviews: function($stateParams, ReviewFactory) {
                    var id = $stateParams.id;
                    return ReviewFactory.getProductReviews(id)
                }
            }
        })
        .state('product.addReview', {
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
        })
        .state('reviewSuccess', {
            url: '/review-submitted',
            templateUrl: 'js/product/templates/success.html'
        })

});
