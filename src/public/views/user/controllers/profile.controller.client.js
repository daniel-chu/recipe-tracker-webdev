(function() {
    angular.module('RecipEat')
        .controller('profileController', profileController);

    function profileController($scope, $routeParams, userService, recipeService, loggedInUser) {
        var vm = this;
        vm.loggedInUser = loggedInUser;
        vm.profileUsername = $routeParams['username'];
        vm.followThisUser = followThisUser;

        function init() {
            retrieveUserForThisProfile().then(function(user) {
                userService.getUsersFollowing(user._id).then(function(usersFollowing) {
                    vm.usersFollowing = usersFollowing;
                    $scope.$apply();
                });

                userService.getFollowers(user._id).then(function(followers) {
                    vm.followers = followers;
                    $scope.$apply();
                });

                recipeService.getCachedRecipeInfo(user.sharedRecipes).then(function(sharedRecipes) {
                    vm.sharedRecipes = sharedRecipes;
                    $scope.$apply();
                });

                recipeService.getCachedRecipeInfo(user.likedRecipes).then(function(likedRecipes) {
                    vm.likedRecipes = likedRecipes;
                    $scope.$apply();
                });
            });
        }

        function retrieveUserForThisProfile() {
            if (vm.loggedInUser && vm.loggedInUser.username === vm.profileUsername) {
                vm.user = vm.loggedInUser;
                vm.myProfile = true;
                return Promise.resolve(vm.user);
            } else {
                return userService.findUserByUsername(vm.profileUsername)
                    .then(function(user) {
                        if (!user) {
                            vm.doesNotExist = true;
                        }
                        vm.user = user;
                        vm.myProfile = false;
                        $scope.$apply();
                        return Promise.resolve(vm.user);
                    });
            }
        }

        function followThisUser(user) {
            userService.createFollowFromUserToUser(vm.loggedInUser._id, user._id);
        }

        init();
    }

})();