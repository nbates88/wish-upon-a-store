app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('collections', {
        url: '/collections/:id',
        controller: 'CollectionCtrl',
        templateUrl: 'js/collections/collections.html',
        resolve: {
        	collection: function($stateParams, ProductFactory){
                var id = $stateParams.id;
                console.log("id", id)
        		return ProductFactory.getOneCollection(id)
        	}
            // collection: function(ProductFactory){
            //     console.log(ProductFactory.getOneCollection)
            //     return {name:"health"}
            // }
        }
    });

});

app.controller('CollectionCtrl', function($scope, collection){
    console.log("controller collection", collection);
    $scope.collection = collection;
})