app.config(function($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/my-account/my-account.html',
        controller: function($scope, MyAccountFactory) {

            // new Date() --> 'May 31, 2016'
            // function convertDate(date) {
            //     date = date.slice(0, 10).split('-')
            //     var months = {
            //         '01': 'January',
            //         '02': 'February',
            //         '03': 'March',
            //         '04': 'April',
            //         '05': 'May',
            //         '06': 'June',
            //         '07': 'July',
            //         '08': 'August',
            //         '09': 'September',
            //         '10': 'October',
            //         '11': 'November',
            //         '12': 'December',
            //     }
            //     return months[date[1]] + ' ' + date[2] + ', ' + date[0]
            // }

            MyAccountFactory.getMyAccount()
                .then(function(accountInfo) {
                    // console.log('account info is', accountInfo)
                    // accountInfo.createdAt = convertDate(accountInfo.createdAt);
                    // accountInfo.updatedAt = convertDate(accountInfo.updatedAt);
                    // console.log(accountInfo.createdAt)
                    // $scope.accountInfo = {
                    //     id: accountInfo.id,
                    //     createdAt: accountInfo.createdAt,
                    //     updatedAt: accountInfo.updatedAt,
                    //     status: accountInfo.status
                    // };
                    $scope.accountInfo = accountInfo

                });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('MyAccountFactory', function($http) {

    var getMyAccount = function() {
        return $http.get('/api/members/myaccount').then(function(response) {
            console.log('data retrieved:', response.data)
            return response.data;
        });
    };

    return {
        getMyAccount: getMyAccount
    };

});
