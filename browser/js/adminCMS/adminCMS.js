app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'js/adminCMS/adminCMS.html'
    });

    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl: 'js/adminCMS/adminCMSusers.html'
    });

    $stateProvider.state('admin.products', {
        url: '/products',
        templateUrl: 'js/adminCMS/adminCMSproducts.html'
    });

    $stateProvider.state('admin.collections', {
        url: '/collections',
        templateUrl: 'js/adminCMS/adminCMScollections.html'
    });

    $stateProvider.state('admin.orders', {
        url: '/orders',
        templateUrl: 'js/adminCMS/adminCMSorders.html'
    });

});


app.controller('AdminCtrl', function($scope){
    
});