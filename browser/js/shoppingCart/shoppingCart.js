app.config(function ($stateProvider) {    
    $stateProvider.state('shoppingCart', {
        url: '/shoppingcart',
        controller: 'ShoppingCartCtrl',
        templateUrl: 'js/shoppingCart/shoppingcart.html',
        // resolve: {
        // 	product: function($stateParams, ProductFactory){
        //         var id = $stateParams.id;
        // 		return ProductFactory.getOneProduct(id)
        // 	}
        // }
    });

});

app.controller('ShoppingCartCtrl', function($scope, $state, OrderFactory){
    // $scope.products = OrderFactory.getProducts();
    console.log($scope.product);
})
