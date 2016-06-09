app.controller('AdminCollectionsCtrl', function($scope, AdminFactory, collections, $rootScope){
    $scope.collections = collections;


    $scope.deleteCollection = function(collection){
        $scope.collections.splice($scope.collections.indexOf(collection), 1)
        AdminFactory.deleteCollection(collection)
        $rootScope.$broadcast('collectionsUpdate', $scope.collections)
    };

    $scope.createCollection = function(data){
        $scope.collectionForm.$setPristine();
        AdminFactory.createCollection(data)
            .then(function(collection){
                $scope.collections.push(collection)
                $rootScope.$broadcast('collectionsUpdate', $scope.collections)
            })
    }
    });