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

app.controller('ShoppingCartCtrl', function($scope, $window, $state, foundProducts, OrderFactory){

    $scope.products = foundProducts;
    $scope.removeItem = function (product) {
    var idx = $scope.products.indexOf(product)
    var id = product.id
    return OrderFactory.removeProduct(id)
      .then(function(something){
        return $scope.products.splice(idx, 1)
      })
    };

    $scope.increaseQuantity = function(product){
        var productId = product.id
        var idx = $scope.products.indexOf(product)
        $scope.products[idx].OrderProducts.quantity++
        if(($scope.products[idx].OrderProducts.quantity) > 3){
            $scope.products[idx].OrderProducts.quantity = 3
        }
        $scope.updateProductQty(productId, $scope.products[idx].OrderProducts.quantity)
    };

     $scope.decreaseQuantity = function(product){
        var productId = product.id
        var idx = $scope.products.indexOf(product)
        $scope.products[idx].OrderProducts.quantity--
        if($scope.products[idx].OrderProducts.quantity < 1){
            $scope.products[idx].OrderProducts.quantity = 1
            $window.alert("Please click on the x if you want to remove this product from the order.");
        }
        $scope.updateProductQty(productId, $scope.products[idx].OrderProducts.quantity)
    };

    $scope.updateProductQty = function(productId, quantity){
        var qty = {
            'qty': quantity
        }

        return OrderFactory.updateProductQty(productId, qty)

    };

    $scope.checkout = function(){
        $state.go('/checkout')
    }
});
