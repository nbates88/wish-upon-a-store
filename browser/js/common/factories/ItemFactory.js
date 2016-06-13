/*
//////////////////
 NOTE: THIS NEEDS TO BE CHANGED ONCE THE ORDER FUNCTIONALITY IS ADDED
 ////////////////
*/

//EI: what's your thinking for what this factory is going to do?
app.factory('ItemFactory', function () {
	var product =[];
	return {
		addProduct: function(newObj){
		 	product.push(newObj)
	 	},

		getProducts: function(){
	 		return product
	 	}
	}
});
