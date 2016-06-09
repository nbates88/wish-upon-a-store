app.controller('AdminProductsCtrl', function($scope, products, AdminFactory){
    $scope.products = products;
    $scope.deleteProduct = function(product){
        $scope.products.splice($scope.products.indexOf(product), 1)
        AdminFactory.deleteProduct(product.id)
    };

    $scope.createProduct = function(data){
        console.log($scope.productForm);
        $scope.productForm.$setPristine();
        AdminFactory.createProduct(data)
            .then(function(product){
                $scope.products.push(product)
            })
    }
    });