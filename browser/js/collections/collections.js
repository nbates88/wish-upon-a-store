app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('collections', {
        url: '/collections/:id',
        controller: 'CollectionCtrl',
        templateUrl: 'js/collections/collections.html',
        resolve: {
        	collection: function($stateParams, ProductFactory){
                var id = $stateParams.id;
                if(id === 'all'){
                   return ProductFactory.getAllProducts(); 
                }else{
                   return ProductFactory.getProductsByCollectionId(id); 
                }
        	},
            collectionName: function($stateParams, ProductFactory){
                var id = $stateParams.id;
                if(id === 'all'){
                   return {name: "all"}; 
                }else{
                   return ProductFactory.getOneCollection(id); 
                }
            }
        }
    });

});

app.controller('CollectionCtrl', function($scope, collection, collectionName){
    $scope.name = collectionName;
    $scope.products = collection;
});