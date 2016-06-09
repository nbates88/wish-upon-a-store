app.factory('MyAccountFactory', function($http) {

    var getMyAccount = function() {
        return $http.get('/api/members/myaccount').then(function(response) {
            return response.data;
        });
    };

    return {
        getMyAccount: getMyAccount,
    };

});
