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
                
            }
        }
    });

});

app.controller('ProductCtrl', function($scope, product, $state, OrderFactory, AdminFactory, user, $http){
    
    $scope.deleteProduct = function(id){
        AdminFactory.deleteProduct(id);
        $state.go('home');
    };

    $scope.product = product;
    $scope.user = user;
   
    // ItemFactory.addProduct(product)

    $scope.addToCart = function(id){
        console.log('ID',id)
        //use factory function to findOrCreate order where status is open
        //add product to order
        OrderFactory.addProductToOrder(id)
        .then(function(){
            console.log('GOING TO NEW STATE')
            $state.go('shoppingCart')
        });
        //redirect to shoppingCart 
        //and in shoppingCart state, have factoryfunc that getsOrder and renders with res. order from backend
        
    };
});
