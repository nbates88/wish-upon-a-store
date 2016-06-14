app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/templates/checkout.html',
    });

});

app.config(function($stateProvider) {
    $stateProvider.state('checkoutSuccess', {
        url: '/checked-out',
        templateUrl: 'js/checkout/templates/success.html',
    })
})