(function() {
    angular.module('RecipEat')
        .controller('editProfileController', editProfileController);

    function editProfileController($location, userService, checkLoggedIn) {
        var vm = this;
        vm.user = checkLoggedIn;
        vm.updateUser = updateUser;

        function updateUser() {
            userService.updateUser(vm.user._id, vm.user).then(function(user) {
                $location.url('/profile');
            });
        }

    }

})();