app.config(function ($stateProvider) {    
    $stateProvider.state('product', {
        url: '/products/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
        	product: function($stateParams, ProductFactory){
                var id = $stateParams.id;
                console.log("id", id)
        		return ProductFactory.getOneProduct(id)
        	}
        }
    });

});

app.controller('ProductCtrl', function($scope, product){
    
    $scope.product = product;
})
