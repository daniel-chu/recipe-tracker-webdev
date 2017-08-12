(function() {
    angular.module('RecipEat')
        .factory('nutritionService', nutritionService);

    function nutritionService($http) {

        var api = {
            searchNutrition: searchNutrition,
            getNutritionForItem: getNutritionForItem
        }

        return api;

        function searchNutrition(searchString) {
            return $http({
                method: 'GET',
                url: '/api/nutritionix/search',
                params: {
                    searchString: searchString
                }
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
        }

        function getNutritionForItem(nutritionInfoId) {
            return $http({
                method: 'GET',
                url: '/api/nutritionix/' + nutritionInfoId
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
        }
    }


})();