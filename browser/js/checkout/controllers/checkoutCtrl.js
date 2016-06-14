app.controller('CheckoutCtrl', function($scope, $state, OrderFactory, user) {
  $scope.user = user;

  $scope.order = function(checkoutInfo) {

    $scope.checkoutInfo = {
      name: checkoutInfo.name || $scope.user.name,
      email: checkoutInfo.email || $scope.user.email,
      maidenName: checkoutInfo.maidenName,
      ssn: checkoutInfo.ssn
    }

    //updates order status to processing and adds checkout info to order
    OrderFactory.updateOrderStatus($scope.checkoutInfo)
      .then(function() {
        OrderFactory.sendConfirmEmail($scope.checkoutInfo)
        $state.go('home')
      })
  };


});
