app.controller('AdminOrdersCtrl', function($scope, OrderFactory, orders){
	orders.data.forEach(function(order) {
		order._updatedAt = formatDate(order._updatedAt)
	})
	$scope.orders = orders.data
	$scope.allStatus = ["Created", "Processing", "Cancelled", "Completed"]

	$scope.updateStatus = function(order, newStatus) {
		order.status = newStatus
		OrderFactory.updateOrderStatusAsAdmin(order)
	}
});