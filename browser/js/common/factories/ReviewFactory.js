app.factory('ReviewFactory', function($http) {

	var cachedProductReviews = []

	var reviewfac = {}

	reviewfac.addReview = function(review, productId) {
		return $http.post('/api/products/' +productId+'/reviews', review)
			.then(function(review){
				cachedProductReviews.push(review.data)
				return review.data
			})

	};

	reviewfac.getProductReviews = function(productId) {
		return $http.get('/api/products/' + productId + '/reviews')
			.then(function(reviews) {
				angular.copy(reviews.data, cachedProductReviews)
				return cachedProductReviews;
			})
	};

	reviewfac.deleteReview = function() {

	};

	reviewfac.getUserReviews = function() {

	};

	reviewfac.getAverageRating = function() {

	};

	return reviewfac;
})