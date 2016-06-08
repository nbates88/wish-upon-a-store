app.directive('sidebar', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/sidebar/sidebar.html',
        controller: 'SidebarCtrl'

    };

});

app.controller('SidebarCtrl', function($scope, ProductFactory){
    //console.log(ProductFactory.getAllCollections())
        ProductFactory.getAllCollections()
        .then(function(collections){
            console.log(collections)
            $scope.items = collections;
        })
})