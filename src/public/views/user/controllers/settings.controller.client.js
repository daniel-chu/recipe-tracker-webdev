(function() {
    angular.module('RecipEat')
        .controller('settingsController', settingsController);

    function settingsController($scope, userService) {
        var vm = this;

        vm.updatePassword = updatePassword;
        vm.updateEmail = updateEmail;

        function init() {
            userService.getLoggedInUser().then(function(user) {
                vm.user = user;
            });
        }

        function updatePassword(oldPassword, newPassword, newPasswordConfirm) {
            if (oldPassword != vm.user.password) {
                vm.pwAlert = ''
                vm.pwError = 'Incorrect password.';
                return;
            }

            if (newPassword != newPasswordConfirm) {
                vm.pwAlert = '';
                vm.pwError = 'New passwords do not match.';
                return;
            }

            vm.user.password = newPassword;
            userService.updateUser(vm.user._id, vm.user).then(function(user) {
                vm.pwAlert = 'Password successfully updated.';
                vm.pwError = '';
                $scope.$apply();
            });
        }

        function updateEmail(password, newEmail) {
            if (password != vm.user.password) {
                vm.emAlert = '';
                vm.emError = 'Incorrect password.';
                return;
            }

            vm.user.email = newEmail;
            userService.updateUser(vm.user._id, vm.user).then(function(user) {
                vm.emAlert = 'Email successfully updated.';
                vm.emError = '';
                $scope.$apply();
            });
        }
        
        init();
    }

})();