app.factory('MyAccountFactory', function($http) {

    var getMyAccount = function() {
        return $http.get('/api/members/myaccount').then(function(response) {
            console.log('data retrieved:', response.data)
            return response.data;
            myAccount = response.data;
        });
    };

    return {
        getMyAccount: getMyAccount,
    };

});
