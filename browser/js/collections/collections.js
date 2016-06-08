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
        }
    });

});

app.controller('CollectionCtrl', function($scope, collection){
    $scope.collection = collection;
});