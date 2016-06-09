app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'js/adminCMS/adminCMS.html',
        resolve: {
            users: function(AdminFactory){
                return AdminFactory.getAllUsers()
            },
            products: function(ProductFactory){
                return ProductFactory.getAllProducts()
            }
        }
    });

    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl: 'js/adminCMS/adminCMSusers.html'
    });

    $stateProvider.state('admin.products', {
        url: '/products',
        templateUrl: 'js/adminCMS/adminCMSproducts.html'
    });

    $stateProvider.state('admin.collections', {
        url: '/collections',
        templateUrl: 'js/adminCMS/adminCMScollections.html'
    });

    $stateProvider.state('admin.orders', {
        url: '/orders',
        templateUrl: 'js/adminCMS/adminCMSorders.html'
    });

});


app.controller('AdminCtrl', function($scope, ProductFactory, users, products, AdminFactory){
    $scope.users = users; 
    $scope.products = products;
    // realized admin doesn't need to create user
    // $scope.createUser = AdminFactory.createUser;
   
    $scope.deleteUser = function(user){
        $scope.users.splice($scope.users.indexOf(user), 1)
        AdminFactory.deleteUser(user.id)
    };

    $scope.makeAdmin = function(id){
        var user = _.find($scope.users, function(user){
            return user.id === id
        });
        user.isAdmin = true;
        AdminFactory.editUser(id, {isAdmin: true})

    };
    $scope.removeAdmin = function(id){
        var user = _.find($scope.users, function(user){
            return user.id === id
        });
        user.isAdmin = false;
        AdminFactory.editUser(id, {isAdmin: false})
        .then(function(){
             
        })
    };

     $scope.deleteProduct = function(product){
        $scope.products.splice($scope.products.indexOf(product), 1)
        AdminFactory.deleteProduct(product.id)
    };
});





