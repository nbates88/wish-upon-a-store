app.controller('AdminCollectionsCtrl', function($scope, ProductFactory, collections){
    $scope.collections = collections;

    $scope.deleteCollection = function(collection){
        console.log(collection);
        $scope.collections.splice($scope.collections.indexOf(collection), 1)
        ProductFactory.deleteCollection(collection)
    };

    $scope.createCollection = function(data){
        $scope.collectionForm.$setPristine();
        $scope.collection = {}
        ProductFactory.createCollection(data)
    }

    $scope.editCollection = function(newcollection, oldcollection){
            ProductFactory.editCollection(oldcollection.id, newcollection)
        }
    
    });