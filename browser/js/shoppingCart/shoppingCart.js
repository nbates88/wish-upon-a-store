app.config(function ($stateProvider) {    
    $stateProvider.state('shoppingCart', {
        url: '/shoppingcart',
        controller: 'ShoppingCartCtrl',
        templateUrl: 'js/shoppingCart/shoppingcart.html',
        resolve: {
        	foundProducts: function(OrderFactory){
        		return OrderFactory.getProducts();
        	}
        }
    });

});

app.controller('ShoppingCartCtrl', function($scope, foundProducts){

    $scope.products = foundProducts;
    $scope.qty = 2;
});
