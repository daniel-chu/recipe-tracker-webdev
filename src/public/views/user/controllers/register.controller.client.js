(function() {
    angular.module('RecipEat')
        .controller('registerController', registerController);

    function registerController($rootScope, $location, userService) {
        var vm = this;

        vm.register = register;
        vm.returnToPreviousPage = returnToPreviousPage;

        function register(userInfo) {
            isValidRegistrationInfo(userInfo)
                .then(function(isValid) {
                    if (isValid) {
                        return userService.createUser(userInfo);
                    }
                    return Promise.resolve(null);
                })
                .then(function(user) {
                    if (user) {
                        $rootScope.loggedIn = true;
                        returnToPreviousPage();
                    }

                    $rootScope.$apply();
                });
        }

        function returnToPreviousPage() {
            var returnUrl = $rootScope.previousUrl || "";
            $location.url(returnUrl);
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

            return userService.findUserByUsername(username).then(function(existingUser) {
                if (existingUser) {
                    vm.error = 'Username already taken.';
                    return false;
                }
                return true;
            });
        }
    };

})();