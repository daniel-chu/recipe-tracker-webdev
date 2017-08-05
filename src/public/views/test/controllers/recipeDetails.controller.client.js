(function() {
    angular.module('RecipeTracker')
        .controller('recipeDetailsController', recipeDetailsController);

    function recipeDetailsController($routeParams, recipeService) {
        vm = this;
        vm.recipeId = $routeParams['rid'];
        
        function init() {
            recipeService.getRecipeFromF2F(vm.recipeId).then(function(result) {
                vm.recipe = result.recipe;
            });
        }
        init();
    }

})();