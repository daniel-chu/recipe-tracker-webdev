(function() {
    angular.module('RecipeTracker')
        .controller('food2ForkTestSearchController', food2ForkTestSearchController);

    function food2ForkTestSearchController(recipeService) {
        vm = this;
        vm.searchRecipe = searchRecipe;

        function searchRecipe(searchString) {
            recipeService.searchRecipe(searchString)
            .then(function(result) {
                renderRecipes(result.recipes);
            });
        }

        function renderRecipes(recipes) {
            vm.recipes = recipes;
        }

    }

})();