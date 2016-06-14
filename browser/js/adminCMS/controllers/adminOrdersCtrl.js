app.controller('AdminOrdersCtrl', function($scope, OrderFactory, orders){
	$scope.orders = orders.data
	$scope.allStatus = ["Created", "Processing", "Cancelled", "Completed"]

	$scope.updateStatus = function(order, newStatus) {
		order.status = newStatus
		OrderFactory.updateOrderStatusAsAdmin(order)
	}
});