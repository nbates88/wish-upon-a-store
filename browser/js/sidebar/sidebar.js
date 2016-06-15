app.directive('sidebar', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/sidebar/sidebar.html',
        controller: 'SidebarCtrl'

    };

});

app.controller('SidebarCtrl', function($scope, ProductFactory, $rootScope) {
    ProductFactory.getAllCollections()
        .then(function(collections) {
            $scope.items = collections;
        })
})
