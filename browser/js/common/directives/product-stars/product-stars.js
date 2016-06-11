app.directive('productStars', function(ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-stars/product-stars.html',
        scope: {
            productid: '='
        },
        link: function(scope, element, attributes) {
            ReviewFactory.getProductReviews(scope.productid)
                .then(function(reviews) {
                    if (reviews) {
                        scope.stars = getAverage(reviews.map(review => review.stars));
                    }
                });
        }
    };
});
