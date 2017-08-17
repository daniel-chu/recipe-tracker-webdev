(function() {
    angular.module('RecipEat')
        .controller('editProfileController', editProfileController);

    function editProfileController($location, userService, checkLoggedIn) {
        var vm = this;
        vm.user = checkLoggedIn;
        vm.updateUser = updateUser;

        function updateUser() {
            console.log(vm.user._id);
            console.log(vm.user);
            userService.updateUser(vm.user._id, vm.user).then(function(user) {
                console.log(user);
                $location.url('/profile');
            });
        }

    }

})();