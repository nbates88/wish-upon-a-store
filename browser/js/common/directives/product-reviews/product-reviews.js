app.directive('productReviews', function(reviews, ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-reviews/product-reviews.html',
        link: function(scope) {
            scope.reviews = reviews;
            scope.addReview = function() {
                var review = scope.review;
                scope.reviewForm.$setPristine();
                scope.review = {};

                ReviewFactory.addReview(review, $scope.product.id);
            }
        }
    }
})
