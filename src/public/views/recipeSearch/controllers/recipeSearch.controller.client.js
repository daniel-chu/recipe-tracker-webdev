(function() {
    angular
        .module('RecipEat')
        .controller('recipeSearchController', recipeSearchController);

    function recipeSearchController($routeParams, recipeService) {
        vm = this;
        vm.recipeSearchText = $routeParams['recipeSearchText'];

        vm.searchRecipe = searchRecipe;

        function searchRecipe(recipeSearchText) {
            recipeService.searchRecipe(recipeSearchText)
                .then(function(result) {
                    renderRecipes(result.recipes);
                });
        }

        function renderRecipes(recipes) {
            vm.recipes = recipes;
        }

        function init() {
            $('#navbar-recipe-search-input').val(vm.recipeSearchText);
            searchRecipe(vm.recipeSearchText);
        }

        init();
    }

})();