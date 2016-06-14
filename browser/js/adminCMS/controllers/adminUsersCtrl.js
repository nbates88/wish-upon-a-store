app.controller('AdminUsersCtrl', function($scope, users, AdminFactory){
    // realized admin doesn't need to create user
    // $scope.createUser = AdminFactory.createUser;
    $scope.users = users; 
    $scope.deleteUser = function(user){
        $scope.users.splice($scope.users.indexOf(user), 1)
        AdminFactory.deleteUser(user.id)
    };

    $scope.makeAdmin = function(id){
        var user = _.find($scope.users, function(user){
            return user.id === id
        });
        user.isAdmin = true;
        AdminFactory.editUser(id, {isAdmin: true})

    };
    
    $scope.removeAdmin = function(id){
        var user = _.find($scope.users, function(user){
            return user.id === id
        });
        user.isAdmin = false;
        AdminFactory.editUser(id, {isAdmin: false});
    };

    });