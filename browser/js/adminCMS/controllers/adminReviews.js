app.controller('AdminReviewsCtrl', function($scope, reviews, AdminFactory) {

    $scope.reviews = reviews;

    $scope.deleteReview = function(id) {
        console.log('review to delete is', id)
        AdminFactory.deleteReview(id)
    }
});
