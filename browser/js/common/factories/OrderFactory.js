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
    },
    removeProduct : function(id){
      return $http.delete('/api/orders/products/' + id)
    },
    updateProductQty : function(id, qty){
      return $http.put('/api/orders/products/' + id, qty)
    },

    updateOrderStatus : function(checkoutInfo){
      return $http.put('/api/orders/', checkoutInfo)
    },

    sendConfirmEmail : function(checkoutInfo){
      return $http.post('/api/orders/email', checkoutInfo)
    }

  };

});


