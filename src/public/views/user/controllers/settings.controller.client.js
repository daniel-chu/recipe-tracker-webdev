(function() {
    angular.module('RecipEat')
        .controller('settingsController', settingsController);

    function settingsController($scope, $rootScope, userService) {
        var vm = this;

        vm.updateUsername = updateUsername;
        vm.updatePassword = updatePassword;
        vm.updateEmail = updateEmail;

        function init() {
            userService.getLoggedInUser().then(function(user) {
                vm.user = user;
            });
        }

        function updateUsername(password, newUsername) {
            if (!(password && newUsername)) {
                vm.unAlert = '';
                vm.unError = 'Please fill in all fields.';
                return;
            }

            userService.validatePassword(password).then(function(correct) {
                if (!correct) {
                    vm.unAlert = '';
                    vm.unError = 'Incorrect password.';
                    return;
                } else {
                    return userService.findUserByUsername(newUsername).then(function(existingUser) {
                        if (existingUser) {
                            vm.unAlert = '';
                            vm.unError = 'Username already taken.';
                            return;
                        }

                        vm.user.username = newUsername;
                        return userService.updateUser(vm.user._id, vm.user).then(function(user) {
                            $rootScope.updateNavbarUsername();

                            vm.unAlert = 'Username successfully updated.';
                            vm.unError = '';
                            return;
                        });
                    });
                }
            });
        }


        function updatePassword(oldPassword, newPassword, newPasswordConfirm) {
            if (!(oldPassword && newPassword && newPasswordConfirm)) {
                vm.pwAlert = '';
                vm.pwError = 'Please fill in all fields.';
                return;
            }
            userService.validatePassword(oldPassword).then(function(correct) {
                if (!correct) {
                    vm.pwAlert = '';
                    vm.pwError = 'Incorrect password.';
                } else {
                    if (newPassword != newPasswordConfirm) {
                        vm.pwAlert = '';
                        vm.pwError = 'New passwords do not match.';
                        return;
                    }

                    userService.updatePassword(newPassword).then(function(user) {
                        vm.pwAlert = 'Password successfully updated.';
                        vm.pwError = '';
                    });
                }
            });
        }

        function updateEmail(password, newEmail) {
            if (!(password && newEmail)) {
                vm.emAlert = '';
                vm.emError = 'Please fill in all fields.';
                return;
            }
            userService.validatePassword(password).then(function(correct) {
                if (!correct) {
                    vm.emAlert = '';
                    vm.emError = 'Incorrect password.';
                } else {
                    vm.user.email = newEmail;
                    userService.updateUser(vm.user._id, vm.user).then(function(user) {
                        vm.emAlert = 'Email successfully updated.';
                        vm.emError = '';
                    });
                }
            });
        }

        init();
    }

})();