app.controller('AdminProductsCtrl', function($scope, products, ProductFactory, AdminFactory){
    
    //here we get info
    $scope.products = products;
   
    ProductFactory.getAllCollections()
    .then(function(collections){
        $scope.collections = collections;
        
    });

    $scope.deleteProduct = function(product){
        $scope.products.splice($scope.products.indexOf(product), 1);
        AdminFactory.deleteProduct(product.id);
    };

    //here we set it
    $scope.createProduct = function(data){
        console.log($scope.productForm);
        $scope.productForm.$setPristine();
        $scope.product = {};
        AdminFactory.createProduct(data);   
    };

    $scope.editProduct = function(product){
            AdminFactory.editProduct(product.id, product);
    };
});
            



