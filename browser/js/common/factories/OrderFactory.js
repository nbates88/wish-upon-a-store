app.factory('OrderFactory', function($http){
  return {
    getAllOrders: function() {
      return $http.get('/api/orders')
    },
    addProductToOrder : function(product){
      return $http.post('/api/orders/products/', product);
    },
    getProducts : function(){
      return $http.get('/api/orders/products')
      .then(function(products){
        return products.data;
      })
      
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

    updateOrderStatusAsAdmin : function(order){
      return $http.put('/api/orders/status', order)
    },

    sendConfirmEmail : function(checkoutInfo){
      return $http.post('/api/orders/email', checkoutInfo)
    }

  };

});


