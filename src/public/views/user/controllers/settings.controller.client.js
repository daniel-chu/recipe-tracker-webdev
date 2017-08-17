(function() {
    angular.module('RecipEat')
        .controller('settingsController', settingsController);

    function settingsController($scope, $rootScope, userService, checkLoggedIn) {
        var vm = this;
        vm.user = checkLoggedIn;
        vm.isOAuthUser = !!(vm.user.google || vm.user.facebook);

        vm.newUsername = vm.user.username;
        vm.newEmail = vm.user.email;

        vm.updateUsername = updateUsername;
        vm.updateEmail = updateEmail;
        vm.updatePassword = updatePassword;

        function updateUsername(password, newUsername) {
            if (vm.isOAuthUser) {
                if (newUsername) {
                    return checkExistingUsernameAndUpdateIfNone(newUsername);
                }
                vm.unAlert = '';
                vm.unError = 'Please fill in new username.';
                return;
            }

            if (!(password && newUsername)) {
                vm.unAlert = '';
                vm.unError = 'Please fill in all fields.';
                return;
            }

            return userService.validatePassword(password).then(function(correct) {
                if (!correct) {
                    vm.unAlert = '';
                    vm.unError = 'Incorrect password.';
                    return;
                } else {
                    return checkExistingUsernameAndUpdateIfNone(newUsername)
                }
            });;
        }

        function updateEmail(password, newEmail) {
            if (vm.isOAuthUser) {
                vm.user.email = newEmail;
                return userService.updateUser(vm.user._id, vm.user).then(function(user) {
                    vm.emAlert = 'Email successfully updated.';
                    vm.emError = '';
                });
            }

            if (!(password && newEmail)) {
                vm.emAlert = '';
                vm.emError = 'Please fill in all fields.';
                return;
            }

            return userService.validatePassword(password).then(function(correct) {
                if (!correct) {
                    vm.emAlert = '';
                    vm.emError = 'Incorrect password.';
                    return;
                } else {
                    vm.user.email = newEmail;
                    return userService.updateUser(vm.user._id, vm.user).then(function(user) {
                        vm.emAlert = 'Email successfully updated.';
                        vm.emError = '';
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

            return userService.validatePassword(oldPassword).then(function(correct) {
                if (!correct) {
                    vm.pwAlert = '';
                    vm.pwError = 'Incorrect password.';
                    return;
                } else {
                    if (newPassword != newPasswordConfirm) {
                        vm.pwAlert = '';
                        vm.pwError = 'New passwords do not match.';
                        return;
                    }

                    return userService.updatePassword(newPassword).then(function(user) {
                        vm.pwAlert = 'Password successfully updated.';
                        vm.pwError = '';
                    });
                }
            });
        }

        function checkExistingUsernameAndUpdateIfNone(newUsername) {
            return userService.findUserByUsername(newUsername).then(function(existingUser) {
                if (existingUser) {
                    vm.unAlert = '';
                    vm.unError = 'Username already taken.';
                    return;
                }

                vm.user.username = newUsername;
                return userService.updateUser(vm.user._id, vm.user).then(function(user) {
                    $rootScope.updateNavbar();

                    vm.unAlert = 'Username successfully updated.';
                    vm.unError = '';
                });
            });
        }
    }

})();