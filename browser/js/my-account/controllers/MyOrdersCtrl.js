app.controller('MyOrdersCtrl', function($scope, orders) {

	$scope.orders = orders

    // MyAccountFactory.getMyAccount()
    //     .then(function(response) {
    //         response.Orders.forEach(order => {
    //             order._createdAt = formatDate(order._createdAt);
    //             order._updatedAt = formatDate(order._updatedAt);
    //         });
    //         $scope.orders = response.Orders
    //     });


})
