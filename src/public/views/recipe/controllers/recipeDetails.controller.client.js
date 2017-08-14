(function() {
    angular.module('RecipEat')
        .controller('recipeDetailsController', recipeDetailsController);

    function recipeDetailsController($routeParams, recipeService) {
        vm = this;
        vm.recipeId = $routeParams['recipeId'];
        
        function init() {
            recipeService.getRecipeDetails(vm.recipeId).then(function(result) {
                vm.recipe = result.recipe;
            });
        }

        init();
    }

})();