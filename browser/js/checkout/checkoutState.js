app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/templates/checkout.html',
    });

});