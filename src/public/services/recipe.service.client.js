(function() {
    angular.module('RecipEat')
        .factory('recipeService', recipeService);

    function recipeService($http) {

        var api = {
            searchRecipe: searchRecipe,
            getRecipeFromF2F: getRecipeFromF2F
        }

        return api;

        function searchRecipe(searchString) {
            return $http({
                method: 'GET',
                url: '/api/food2fork/search',
                params: {
                    searchString: searchString
                }
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
        }

        function getRecipeFromF2F(recipeId) {
            return $http({
                method: 'GET',
                url: '/api/food2fork/' + recipeId
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
        }
    }


})();