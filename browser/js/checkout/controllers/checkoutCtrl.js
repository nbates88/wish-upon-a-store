app.controller('CheckoutCtrl', function($scope, $state, OrderFactory) {

    $scope.order = function(checkoutInfo) {
    	console.log(checkoutInfo.name)

    	$scope.checkoutInfo = {
    		name: checkoutInfo.name,
    		email: checkoutInfo.email,
    		maidenName: checkoutInfo.maidenName,
    		ssn: checkoutInfo.ssn
    	}

        //updates order status to processing and adds checkout info to order
      	OrderFactory.updateOrderStatus($scope.checkoutInfo)
      	.then(function(){
          OrderFactory.sendConfirmEmail($scope.checkoutInfo)
          $state.go('home')
      	}) 
    };

  
});
