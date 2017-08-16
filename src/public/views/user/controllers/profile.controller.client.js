(function() {
    angular.module('RecipEat')
        .controller('profileController', profileController);

    function profileController($scope, $routeParams, userService, recipeService, loggedInUser) {
        var vm = this;
        vm.loggedInUser = loggedInUser;
        vm.profileUsername = $routeParams['username'];
        vm.followThisUser = followThisUser;
        vm.isAlreadyFollowingUser = isAlreadyFollowingUser;

        vm.getSharedRecipes = getSharedRecipes;
        vm.getLikedRecipes = getLikedRecipes;
        vm.getFollowers = getFollowers;
        vm.getUsersFollowing = getUsersFollowing;


        function init() {
            retrieveUserForThisProfile().then(function(user) {
                getSharedRecipes();
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
                        return Promise.resolve(vm.user);
                    });
            }
        }

        function followThisUser(user) {
            userService.createFollowFromUserToUser(vm.loggedInUser._id, user._id);
        }

        //TODO COME BACK TO THIS AFTER SERVER SIDE IMPLEMENTED
        function isAlreadyFollowingUser(user) {
            return true;
        }

        function getSharedRecipes() {
            userService.getSharedRecipesForUser(vm.user._id).then(function(sharedRecipes) {
                vm.sharedRecipes = sharedRecipes;
            });
        }

        function getLikedRecipes() {
            userService.getLikedRecipesForUser(vm.user._id).then(function(likedRecipes) {
                vm.likedRecipes = likedRecipes;
            });
        }

        function getFollowers() {
            userService.getFollowers(vm.user._id).then(function(followers) {
                vm.followers = followers;
            });
        }

        function getUsersFollowing() {
            userService.getUsersFollowing(vm.user._id).then(function(usersFollowing) {
                vm.usersFollowing = usersFollowing;
            });
        }

        init();
    }

})();