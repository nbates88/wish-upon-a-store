app.directive('sidebar', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/sidebar/sidebar.html',
        controller: 'SidebarCtrl'

    };

});

app.controller('SidebarCtrl', function($scope, ProductFactory, $rootScope) {
    // EI: should also be in a resolve block
    ProductFactory.getAllCollections()
        .then(function(collections) {
            $scope.items = collections;
        })
    // $rootScope.on('collectionsUpdate', function() {
    //     ProductFactory.getAllCollections()
    //         .then(function(collections) {
    //             $scope.items = collections;
    //         })
    // })
})
