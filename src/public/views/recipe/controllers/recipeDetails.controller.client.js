(function() {
    angular.module('RecipEat')
        .controller('recipeDetailsController', recipeDetailsController);

    function recipeDetailsController($routeParams, userService, recipeService, loggedInUser) {
        vm = this;
        vm.recipeId = $routeParams['recipeId'];
        vm.likeRecipe = likeRecipe;
        vm.shareRecipe = shareRecipe;
        vm.unlikeRecipe = unlikeRecipe;
        vm.unshareRecipe = unshareRecipe;

        function init() {
            recipeService.getRecipeDetails(vm.recipeId).then(function(result) {
                vm.recipe = result.recipe;
                if (loggedInUser) {
                    userService.didUserLikeRecipe(loggedInUser._id, vm.recipeId).then(function(isLiked) {
                        vm.isRecipeLiked = isLiked;
                    });

                    userService.didUserShareRecipe(loggedInUser._id, vm.recipeId).then(function(isShared) {
                        vm.isRecipeShared = isShared;
                    });
                }
            });
        }

        function likeRecipe(recipe) {
            userService.likeRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeLiked = true;
            });
        }

        function shareRecipe(recipe) {
            userService.shareRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeShared = true;
            });
        }

        function unlikeRecipe(recipe) {
            userService.unlikeRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeLiked = false;
            });
        }

        function unshareRecipe(recipe) {
            userService.unshareRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeShared = false;
            });
        }

        init();
    }

})();