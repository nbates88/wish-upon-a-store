app.controller('AdminCollectionsCtrl', function($scope, ProductFactory, AdminFactory, collections){
    $scope.collections = collections;

    $scope.deleteCollection = function(collection){
        $scope.collections.splice($scope.collections.indexOf(collection), 1)
        ProductFactory.deleteCollection(collection.id)
    };

    $scope.createCollection = function(data){
        $scope.collectionForm.$setPristine();
        $scope.collection = {}
        ProductFactory.createCollection(data)
    }

    $scope.editCollection = function(collection){
            AdminFactory.editCollection(collection.id, collection)
        }
    
    });