
// THIS FACTORY CONTAINS FUNCTIONS FOR EVERYONE BUT ADMINS. FOR ADMIN FUNCTIONS, GO TO THE ADMIN FACTORY

app.factory('ReviewFactory', function($http) {

	var reviewfac = {}

	reviewfac.getProductReviews = function(productId) {
		return $http.get('/api/products/' + productId + '/reviews')
			.then(function(reviews) {
				return reviews.data;
			})
	};

	reviewfac.getUserReviews = function() {
		return $http.get('/api/reviews/user')
			.then(function(reviews) {
				return reviews.data;
			});
	};

	reviewfac.addReview = function(review, productId) {
		return $http.post('/api/products/' +productId+'/reviews', review)
			.then(function(review){
				return review.data
			})
	};

	return reviewfac;
})