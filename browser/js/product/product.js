app.config(function ($stateProvider) {    
    $stateProvider.state('product', {
        url: '/products/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
        	product: function($stateParams, ProductFactory){
                var id = $stateParams.id;
        		return ProductFactory.getOneProduct(id)
        	}
        }
    });

});

app.controller('ProductCtrl', function($scope, product, $state, ItemFactory){
    
    $scope.product = product;

    $scope.setItemInfo = function(){
        console.log(product)
        ItemFactory.addProduct(product)
    }


    $scope.addToCart = function(){
        $state.go('shoppingCart')
    }
})
