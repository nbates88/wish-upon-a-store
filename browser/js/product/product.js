app.config(function ($stateProvider) {    
    $stateProvider.state('product', {
        url: '/products/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
        	product: function($stateParams, ProductFactory){
                var id = $stateParams.id;
        		return ProductFactory.getOneProduct(id)
        	},
            user: function(AuthService){
                return  AuthService.getLoggedInUser();
                
            },
            reviews: function($stateParams, ReviewFactory) {
                var id = $stateParams.id;
                return ReviewFactory.getProductReviews(id)
            }
        }
    });

});

app.controller('ProductCtrl', function($scope, product, $state, OrderFactory, AdminFactory, user, reviews, ReviewFactory){
    
    $scope.deleteProduct = function(id){
        AdminFactory.deleteProduct(id);
        $state.go('home');
    };

    $scope.product = product;
    $scope.options = [{ name: "1", id: 1 }, { name: "2", id: 2 }, { name: "3", id: 3 }];
    
    $scope.user = user;
    $scope.reviews = reviews;

    $scope.addReview = function() {
        var review = $scope.review;
        $scope.reviewForm.$setPristine();
        $scope.review = {};

        ReviewFactory.addReview(review, $scope.product.id)
    }
    
    $scope.addToCart = function(id, selectedQuantity){
        var product = {
            'id': id,
            'qnty': selectedQuantity.id
        }
        OrderFactory.addProductToOrder(product)
        .then(function(){
            $state.go('shoppingCart')
        });
    };
});
