(function() {
    angular.module('RecipEat')
        .controller('adminEditUserController', adminEditUserController);

    function adminEditUserController($routeParams, $location, userService) {
        var vm = this;
        vm.username = $routeParams['username'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            userService.findUserByUsername(vm.username).then(function(user) {
                vm.user = user;
            });
        }

        function updateUser() {
            if (vm.user.username !== vm.username) {
                userService.findUserByUsername(vm.user.username).then(function(existingUser) {
                    if (existingUser) {
                        vm.alert = '';
                        vm.error = 'Username already taken.';
                    } else {
                        userService.updateUser(vm.user._id, vm.user).then(function(user) {
                            vm.error = '';
                            vm.alert = 'User successfully updated.';
                        });
                    }
                });
            } else {
                userService.updateUser(vm.user._id, vm.user).then(function(user) {
                    vm.error = '';
                    vm.alert = 'User successfully updated.';
                });
            }
        }

        function deleteUser() {
            var confirmation = confirm("Are you sure you want to delete " + vm.username + "?");

            if (confirmation) {
                userService.deleteUser(vm.user._id).then(function(user) {
                    $location.url('/admin');
                });
            }
        }

        init();
    }
})();