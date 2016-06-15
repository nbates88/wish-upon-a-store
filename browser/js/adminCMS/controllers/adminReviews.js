app.controller('AdminReviewsCtrl', function($scope, reviews, AdminFactory) {

    $scope.reviews = reviews;

    $scope.deleteReview = function(id) {
        AdminFactory.deleteReview(id)
    }
});
