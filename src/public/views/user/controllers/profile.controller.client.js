(function() {
    angular.module('RecipEat')
        .controller('profileController', profileController);

    function profileController($scope, $routeParams, userService, loggedInUser) {
        var vm = this;
        vm.loggedInUser = loggedInUser;
        vm.profileUsername = $routeParams['username'];

        function init() {
            if (vm.loggedInUser && vm.loggedInUser.username === vm.profileUsername) {
                vm.user = vm.loggedInUser;
                vm.myProfile = true;
            } else {
                userService.findUserByUsername(vm.profileUsername)
                    .then(function(user) {
                        if (!user) {
                            vm.doesNotExist = true;
                        }
                        vm.user = user;
                        vm.myProfile = false;
                        $scope.$apply();
                    });
            }
        }

        init();
    }

})();