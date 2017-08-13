(function() {
    angular
        .module('RecipEat')
        .controller('recipeSearchController', recipeSearchController);

    function recipeSearchController($rootScope, $routeParams, recipeService) {
        vm = this;
        vm.recipeSearchText = $routeParams['recipeSearchText'];
        // vm.pageNum = $routeParams['pageNum'] || 1;
        $rootScope.recipeSearchText = vm.recipeSearchText;

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
            searchRecipe(vm.recipeSearchText, vm.pageNum);
        }

        init();
    }

})();