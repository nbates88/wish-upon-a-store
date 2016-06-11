app.controller('AdminCollectionsCtrl', function($scope, AdminFactory, collections){
    $scope.collections = collections;

    $scope.deleteCollection = function(collection){
        $scope.collections.splice($scope.collections.indexOf(collection), 1)
        AdminFactory.deleteCollection(collection.id)
    };

    $scope.createCollection = function(data){
        $scope.collectionForm.$setPristine();
        AdminFactory.createCollection(data)
            .then(function(collection){
                $scope.collections.push(collection)
            })
    }

    $scope.editCollection = function(collection){
            AdminFactory.editCollection(collection.id, collection)
        }
    
    });