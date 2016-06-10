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

app.controller('ProductCtrl', function($scope, product, $state, ItemFactory, AdminFactory, user, reviews, ReviewFactory){
    $scope.deleteProduct = function(id){
        AdminFactory.deleteProduct(id);
        $state.go('home');
    }
    $scope.product = product;
    $scope.user = user;
    $scope.reviews = reviews;

    $scope.addReview = function(review){
        console.log(review);
        ReviewFactory.addReview(review, $scope.product.id)
    }
    ItemFactory.addProduct(product)

    $scope.addToCart = function(){
        //use factory function to findOrCreate order where status is open
        //add product to order
        //redirect to shoppingCart 
        //and in shoppingCart state, have factoryfunc that getsOrder and renders with res. order from backend
        $state.go('shoppingCart')
    }
})
