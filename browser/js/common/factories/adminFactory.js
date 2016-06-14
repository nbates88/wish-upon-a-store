app.factory('AdminFactory', function($http) {
    var cachedReviews = []
    return {
        //data will be req.body -- will likely come from a form in an admin panel
        // createProduct: function(data) {
        //     return $http.post('/api/products', data)
        //         .then(function(product) {
        //             return product.data
        //         })
        // },
        // editProduct: function(id, data) {
        //     return $http.put('/api/products/' + id, data)
        //         .then(function(product) {
        //             return product.data
        //         })
        // },
        // deleteProduct: function(id) {
        //     return $http.delete('/api/products/' + id)
        //         .then(function() {
        //             //not sure if anything needs to happen here
        //         })
        // },
        createUser: function(data) {
            return $http.post('/api/users', data)
                .then(function(user) {
                    return user.data
                })
        },
        editUser: function(id, data) {
            return $http.put('/api/users/' + id, data)
                .then(function(user) {
                    return user.data
                })
        },
        deleteUser: function(id) {
            return $http.delete('/api/users/' + id)
                .then(function() {
                    //not sure if anything needs to happen here
                })
        },
        getAllUsers: function() {
            return $http.get('/api/users')
                .then(function(users) {
                    return users.data
                })
        },
        editOrder: function(id, data) {
            return $http.put('/api/orders/' + id, data)
                .then(function(order) {
                    return order.data
                })
        },
        deleteOrder: function(id) {
            return $http.delete('/api/orders/' + id)
                .then(function() {
                    //not sure if anything needs to happen here
                })
        },
        getAllOrders: function() {
            return $http.get('/api/orders')
                .then(function(orders) {
                    return orders.data
                })
        },

        /* REVIEW MGMT FOR ADMINS */

        getAllReviews: function() {
            return $http.get('/api/reviews/')
                .then(function(reviews) {
                    angular.copy(reviews.data, cachedReviews);
                    return reviews.data;
                })
        },
        deleteReview: function(id) {
            return $http.delete('/api/reviews/' + id)
                .then(function() {
                    var index;
                    cachedReviews.forEach(function(rev, i) {
                        if (rev.id === id) index = id;
                    })
                    cachedReviews.splice(index, 1);
                    return cachedReviews
                })
        },


    }



});
