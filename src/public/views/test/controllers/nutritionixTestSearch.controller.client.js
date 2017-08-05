(function() {
    angular.module('RecipeTracker')
        .controller('nutritionixTestSearchController', nutritionixTestSearchController);

    function nutritionixTestSearchController(nutritionService) {
        vm = this;
        vm.searchNutrition = searchNutrition;

        function searchNutrition(searchString) {
            nutritionService.searchNutrition(searchString)
            .then(function(result) {
                renderNutritionOptions(result.hits);
            });
        }

        function renderNutritionOptions(nutritionFacts) {
            vm.nutritionFacts = nutritionFacts;
        }

    }

})();