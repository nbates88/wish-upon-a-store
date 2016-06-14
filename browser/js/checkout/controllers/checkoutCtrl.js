app.controller('CheckoutCtrl', function($scope, $state, OrderFactory) {
   
    $scope.order = function(checkoutInfo) {
        //updates order status to processing and adds checkout info to order
      	OrderFactory.updateOrderStatus($scope.checkoutInfo)
      	.then(function(){
          OrderFactory.sendConfirmEmail($scope.checkoutInfo)
          $state.go('checkoutSuccess')
      	}) 
    };

  
});
