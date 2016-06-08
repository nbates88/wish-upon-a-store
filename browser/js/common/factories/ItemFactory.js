app.factory('ItemFactory', function () {

	 var product =[];

	 var addProduct = function(newObj){
	 	product.push(newObj)
	 	console.log(product)
	 };

	 var getProducts = function(){
	 	return product
	 };

	 return{
	 	addProduct: addProduct,
	 	getProducts: getProducts
	 };
});