app.factory('OrderFactory', function($http){
  return {
    addProductToOrder : function(id){
      return $http.post('/api/orders/products/', id);
    },
    getProducts : function(){
      return $http.get('/api/orders/products')
      .then(function(products){
        console.log('PRODUCTS.DATA', products.data);
        return products.data;
      });
    }
  };

});


