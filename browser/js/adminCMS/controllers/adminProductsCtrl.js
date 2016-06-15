app.controller('AdminProductsCtrl', function($scope, products, ProductFactory, $state){
    
    //here we get info
    $scope.products = products;
   
    ProductFactory.getAllCollections()
    .then(function(collections){
        $scope.collections = collections;
        
    });

    $scope.deleteProduct = function(product){
        $scope.products.splice($scope.products.indexOf(product), 1);
        ProductFactory.deleteProduct(product);
    };

    //here we set it
    $scope.createProduct = function(data){
        $scope.productForm.$setPristine();
        $scope.product = {};
        ProductFactory.createProduct(data);   
    };
   
    $scope.editProduct = function(newProduct, oldProduct){
        if(!newProduct.name) newProduct.name = oldProduct.name;
        if(!newProduct.description) newProduct.description = oldProduct.description; 
        if(!newProduct.price) newProduct.price = oldProduct.price;
        if(!newProduct.imageUrl) newProduct.imageUrl = oldProduct.imageUrl;
        if(!newProduct.inventoryQuantity) newProduct.inventoryQuantity = oldProduct.inventoryQuantity;  
        ProductFactory.editProduct(oldProduct.id, newProduct);
    };
});
            



