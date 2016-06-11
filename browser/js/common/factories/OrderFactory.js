app.factory('OrderFactory', function($http){
  return {
    addProductToOrder : function(product){
      return $http.post('/api/orders/products/', product);
    },
    getProducts : function(){
      return $http.get('/api/orders/products')
      .then(function(products){
        return products.data;
      });
    }
  };

});


