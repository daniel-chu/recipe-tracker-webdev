(function() {
    angular.module('RecipEat')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, loggedInUser) {
        var vm = this;
        vm.loggedInUser = loggedInUser;
        vm.profileUsername = $routeParams['username'] || loggedInUser.username;
        vm.followThisUser = followThisUser;
        vm.unfollowThisUser = unfollowThisUser;

        vm.getSharedRecipes = getSharedRecipes;
        vm.getLikedRecipes = getLikedRecipes;
        vm.getFollowers = getFollowers;
        vm.getUsersFollowing = getUsersFollowing;


        function init() {
            retrieveUserForThisProfile().then(function(user) {
                getSharedRecipes();
                if (vm.loggedInUser) {
                    userService.isUserFollowingUser(vm.loggedInUser._id, user._id)
                        .then(function(isAlreadyFollowing) {
                            vm.isFollowingUser = isAlreadyFollowing;
                        });
                }
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
            userService.createFollowFromUserToUser(vm.loggedInUser._id, user._id).then(function() {
                vm.isFollowingUser = true;
                getFollowers();
            });
        }

        function unfollowThisUser(user) {
            userService.deleteFollowFromUserToUser(vm.loggedInUser._id, user._id).then(function() {
                vm.isFollowingUser = false;
                getFollowers();
            });
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