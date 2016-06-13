app.controller('CheckoutCtrl', function($scope, $state) {

    $scope.order = function() {
        //updates order status to processing and adds checkout info to order
      
        $state.go('home');
    };

  
});
