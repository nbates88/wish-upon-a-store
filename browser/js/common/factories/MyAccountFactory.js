app.factory('MyAccountFactory', function($http) {

    return {
        getMyAccount: function() {
            return $http.get('/api/members/myaccount')
                .then(response => response.data);
        },
        getMyOrders: function() {
            return $http.get('/api/orders/user')
                .then(response => {
                    response.data.forEach(order => {
                        order._createdAt = formatDate(order._createdAt);
                        order._updatedAt = formatDate(order._updatedAt);

                    })
                    return response.data;

                })
        }
    };

});
