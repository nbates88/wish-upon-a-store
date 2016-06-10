app.factory('ReviewFactory', function($http) {

	var reviewfac = {}

	reviewfac.addReview = function(review, productId) {
		return $http.post('/api/products/' +productId+'/reviews', review)
			.then(function(review){
				return review.data
			})

	};

	reviewfac.getProductReviews = function(productId) {
		return $http.get('/api/products/' + productId + '/reviews')
			.then(function(reviews) {
				return reviews.data;
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