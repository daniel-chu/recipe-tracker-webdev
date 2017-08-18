(function() {
    angular.module('RecipEat')
        .controller('adminCreateUserController', adminCreateUserController);

    function adminCreateUserController($location, userService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(userInfo) {
            isValidRegistrationInfo(userInfo)
                .then(function(isValid) {
                    if (isValid) {
                        return userService.createUserNoLogin(userInfo);
                    }
                    return Promise.resolve(null);
                })
                .then(function(user) {
                    if (user) {
                        $location.url('/admin');
                    }
                });
        }

        function isValidRegistrationInfo(userRegistrationInfo) {
            if (!userRegistrationInfo) {
                vm.error = 'Please fill in fields.';
                return Promise.resolve(false);
            }
            var username = userRegistrationInfo.username;
            var password = userRegistrationInfo.password;
            var verifyPassword = userRegistrationInfo.verifyPassword;
            var email = userRegistrationInfo.email;
            var firstName = userRegistrationInfo.firstName;
            var lastName = userRegistrationInfo.lastName;
            var userRole = userRegistrationInfo.role;

            if (!(username && password && verifyPassword)) {
                vm.error = 'Username, password, and verify password fields are required.';
                return Promise.resolve(false);
            }

            if (username.trim().length === 0) {
                vm.error = 'Username cannot be empty space.';
                return Promise.resolve(false);
            }

            if (password !== verifyPassword) {
                vm.error = 'Passwords do not match.';
                return Promise.resolve(false);
            }

            if (!userRole) {
                vm.error = 'Selecting a user role is required.';
                return Promise.resolve(false);
            }

            return userService.findUserByUsername(username).then(function(existingUser) {
                if (existingUser) {
                    vm.error = 'Username already taken.';
                    return false;
                }
                return true;
            });
        }
    }
})();