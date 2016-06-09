app.factory('ProductFactory', function ($http) {
	return {
		getOneProduct: function(id){
			return $http.get('/api/products/'+id)
				.then(function(product){
					return product.data
				})
		},
		getAllProducts: function(){
			return $http.get('/api/products')
				.then(function(products){
					return products.data
				})
		},
		getOneCollection: function(id){
			return $http.get('/api/collections/'+id)
				.then(function(collection){
					console.log("factory collection", collection.data)
					return collection.data
				})
		},
		getAllCollections: function(){
			return $http.get('/api/collections')
				.then(function(collections){
					return collections.data
				})
		},
		getProductsByCollectionId: function(id){
			return $http.get('/api/collections/'+id+'/products')
			.then(function(products){
				console.log(products, "products")
					return products.data
				})
		}
	}



});