app.factory('OrderFactory', function($http){
  return {
    addProductToOrder : function(id){
      return $http.get('/api/orders/products/' + id);
    },
    // getProducts : function(){
    //   return $http.get('/api/orders/products');
    // }
  };

});