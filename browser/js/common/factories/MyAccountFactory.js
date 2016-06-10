app.factory('MyAccountFactory', function($http) {

    var getMyAccount = function() {
        return $http.get('/api/members/myaccount').then(function(response) {
        	console.log("getMyAccount response.data: ", response.data);
            return response.data;
        });
    };

    return {
        getMyAccount: getMyAccount,
    };

});
