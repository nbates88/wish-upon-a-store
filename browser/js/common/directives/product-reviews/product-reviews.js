app.directive('productReviews', function(ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-reviews/product-reviews.html',
        scope: {
            productid: '='
        },
        link: function(scope) {
            ReviewFactory.getProductReviews(scope.productid)
                .then(function(reviews) {
                    scope.reviews = reviews;
                });

            scope.addReview = function() {
                var review = scope.review;
                scope.reviewForm.$setPristine();
                scope.review = {};
                ReviewFactory.addReview(review, scope.productid);
            };

        }
    }
})
