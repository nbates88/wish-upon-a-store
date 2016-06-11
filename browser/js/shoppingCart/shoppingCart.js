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

app.controller('ShoppingCartCtrl', function($scope, $state, foundProducts, OrderFactory){

    $scope.products = foundProducts;

    $scope.removeItem = function (product) {
    var idx = $scope.products.indexOf(product)
    var id = product.id
    return OrderFactory.removeProduct(id)
      .then(function(something){
        return $scope.products.splice(idx, 1)
      })
  };
});
