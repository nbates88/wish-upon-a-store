app.factory('MyAccountFactory', function($http) {

    return {
        getMyAccount: function() {
            console.log('getting my')
            return $http.get('/api/members/myaccount').then(function(response) {
                console.log("getMyAccount response.data: ", response.data);
                return response.data;
            });
        },
        getMyOrders: function() {
        	return $http.get('/api/orders/')
        }
    };

});
