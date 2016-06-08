app.directive('sidebar', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/sidebar/sidebar.html',
        controller: 'SidebarCtrl'
    };

});
app.controller('SidebarCtrl', function($scope){
    $scope.items = [
                { label: 'Career', state: 'collection(career)' },
                { label: 'Romance', state: 'collection(romance)' },
                { label: 'Health', state: 'collection(health)' },
                { label: 'Luxury', state: 'collection(luxury)' }
            ];
})