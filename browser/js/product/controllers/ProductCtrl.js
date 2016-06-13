app.controller('ProductCtrl', function($scope, product, $state, OrderFactory, AdminFactory, user, ReviewFactory) {

    $scope.deleteProduct = function(id) {
        AdminFactory.deleteProduct(id);
        $state.go('home');
    };

    $scope.product = product;
    $scope.options = [{ name: "1", id: 1 }, { name: "2", id: 2 }, { name: "3", id: 3 }];

    $scope.user = user;

    $scope.addToCart = function(id, selectedQuantity) {
        var product = {
            'id': id,
            'qnty': selectedQuantity.id
        }

        OrderFactory.addProductToOrder(product)
            .then(function() {
                $state.go('shoppingCart')
            });
    };
});
