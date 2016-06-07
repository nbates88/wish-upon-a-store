app.config(function ($stateProvider) {

    // Register our *collections* state.
    $stateProvider.state('collections', {
        url: '/collections/:id',
        // controller: 'CollectionCtrl',
        templateUrl: 'js/collections/collections.html',
        // resolve: {
        // 	collection: function($stateParams, $http){
        // 		$http.get('/collections/'+$stateParams.id)
        // 			.then(function(collection){
        // 				console.log(collection);
        // 				return collection;
        // 			})
        // 	}
        // }
    });

});