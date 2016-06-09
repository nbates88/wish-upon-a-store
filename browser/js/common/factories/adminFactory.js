app.factory('AdminFactory', function ($http) {
	return {
		//data will be req.body -- will likely come from a form in an admin panel
		createProduct: function(data){
			return $http.post('/api/products', data)
				.then(function(product){
					return product.data
				})
		},
		editProduct: function(id, data){
			return $http.put('/api/products/'+id, data)
				.then(function(product){
					return product.data
				})
		},
		deleteProduct: function(id){
			return $http.delete('/api/products/'+id)
				.then(function(){
					//not sure if anything needs to happen here
					})
		},
		//here data will likely just be an object that looks like {name: 'Career'}
		createCollection: function(data){
			return $http.post('/api/collections', data)
				.then(function(collection){
					return collection.data
				})
		},
		editCollection: function(id, data){
			return $http.put('/api/collections/'+id, data)
				.then(function(collection){
					return collection.data
				})
		},
		addProductToCollection: function(id, data){
			return $http.post('/api/collections/'+id+'/products', data)
				.then(function(collection){
					return collection.data
				})
		},
		//this would be nice to have at some point :)
		// deleteProductFromCollection: function(catId, productId){
		//return $http.delete('/api/collections/'+catId+'/products/'+productId)
				// .then(function(collection){
				// 	return collection.data
				// })
		// },
		deleteCollection: function(id){
			return $http.delete('/api/collections/'+id)
				.then(function(){
					//not sure if anything needs to happen here
					})
		},
		createUser: function(data){
			return $http.post('/api/users', data)
				.then(function(user){
					return user.data
				})
		},
		editUser: function(id, data){
			return $http.put('/api/users/'+id, data)
				.then(function(user){
					return user.data
				})
		},
		deleteUser: function(id){
			return $http.delete('/api/users/'+id)
				.then(function(){
					//not sure if anything needs to happen here
				})			
		},
		getAllUsers: function(){
			return $http.get('/api/users')
				.then(function(users){
					return users.data
				})
		},
		editOrder: function(id, data){
			return $http.put('/api/orders/'+id, data)
				.then(function(order){
					return order.data
				})
		},
		deleteOrder: function(id){
			return $http.delete('/api/orders/'+id)
				.then(function(){
					//not sure if anything needs to happen here
				})
		},
		getAllOrders: function(){
			return $http.get('/api/orders')
				.then(function(orders){
					return orders.data
				})
		}
	}



});