app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'js/adminCMS/adminCMS.html'
    });

});

app.controller('AdminCtrl', function($scope){
    
});