(function() {
    angular.module('RecipEat')
        .controller('recipeDetailsController', recipeDetailsController);

    function recipeDetailsController($routeParams, userService, recipeService, loggedInUser) {
        vm = this;
        vm.recipeId = $routeParams['recipeId'];
        vm.likeRecipe = likeRecipe;
        vm.shareRecipe = shareRecipe;

        function init() {
            recipeService.getRecipeDetails(vm.recipeId).then(function(result) {
                vm.recipe = result.recipe;
            });
        }

        function likeRecipe(recipe) {
            userService.likeRecipeForUser(recipe, loggedInUser._id);
        }

        function shareRecipe(recipe) {
            userService.shareRecipeForUser(recipe, loggedInUser._id);
        }

        init();
    }

})();