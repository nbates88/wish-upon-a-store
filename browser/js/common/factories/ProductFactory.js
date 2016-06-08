app.factory('ProductFactory', function ($http) {
	return {
		getOneProduct: function(id){
			$http.get('/api/products/'+id)
				.then(function(product){
					return product
				})
		},
		getAllProducts: function(){
			$http.get('/api/products')
				.then(function(products){
					return products
				})
		},
		getOneCollection: function(id){
			$http.get('/api/collections/'+id)
				.then(function(products){
					return products
				})
		},
		getAllCollections: function(){
			$http.get('/api/collections')
				.then(function(collections){
					return collections
				})
		}
	}



});