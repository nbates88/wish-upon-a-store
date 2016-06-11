app.controller('MyOrdersCtrl', function($scope, MyAccountFactory) {

    MyAccountFactory.getMyAccount()
        .then(function(response) {
            response.Orders.forEach(order => {
                order._createdAt = formatDate(order._createdAt);
                order._updatedAt = formatDate(order._updatedAt);
            });
            $scope.orders = response.Orders
        });


})
