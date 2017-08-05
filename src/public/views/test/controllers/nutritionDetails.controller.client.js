(function() {
    angular.module('RecipeTracker')
        .controller('nutritionDetailsController', nutritionDetailsController);

    function nutritionDetailsController($routeParams, nutritionService) {
        vm = this;
        vm.nutritionInfoId = $routeParams['nid'];

        function init() {
            nutritionService.getNutritionForItem(vm.nutritionInfoId).then(function(nutritionInfo) {
                vm.nutritionInfo = nutritionInfo;
            });
        }
        init();
    }

})();