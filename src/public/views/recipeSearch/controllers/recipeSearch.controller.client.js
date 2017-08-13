(function() {
    angular
        .module('RecipEat')
        .controller('recipeSearchController', recipeSearchController);

    function recipeSearchController($rootScope, $routeParams, $location, recipeService) {
        var vm = this;
        vm.recipeSearchText = $routeParams['recipeSearchText'];
        vm.page = parseInt($location.search()['page']) || 1;

        $rootScope.recipeSearchText = vm.recipeSearchText;

        vm.searchRecipe = searchRecipe;

        function searchRecipe(recipeSearchText, page) {
            recipeService.searchRecipe(recipeSearchText, page)
                .then(function(result) {
                    renderRecipes(result.recipes);
                });
        }

        function renderRecipes(recipes) {
            vm.recipes = recipes;
        }

        function init() {
            searchRecipe(vm.recipeSearchText, vm.page);
        }

        init();
    }

})();