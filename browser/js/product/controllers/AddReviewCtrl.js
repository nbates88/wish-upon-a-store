app.controller('AddReviewCtrl', function($scope, product, $state, ReviewFactory) {

    $scope.product = product;
    $scope.addReview = function(review) {

        ReviewFactory.addReview(review, $scope.product.id)
            .then(function(review) {
                $scope.reviewForm.$setPristine();
                $scope.review = {};
                $state.go('reviewSuccess')
            })
    }
});
