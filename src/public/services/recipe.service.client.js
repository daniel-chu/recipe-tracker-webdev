(function() {
    angular.module('RecipEat')
        .factory('recipeService', recipeService);

    function recipeService($http) {

        var cachedRecipes = [];

        var api = {
            searchRecipe: searchRecipe,
            getRecipeDetails: getRecipeDetails,
            cacheRecipe: cacheRecipe
        }

        return api;

        function searchRecipe(searchString, pageNum) {
            return $http({
                method: 'GET',
                url: '/api/food2fork/search',
                params: {
                    searchString: searchString,
                    pageNum: pageNum || 1
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function getRecipeDetails(recipeId) {
            return $http({
                method: 'GET',
                url: '/api/food2fork/' + recipeId
            }).then(function(response) {
                console.log(response);
                return response.data;
            });
        }

        function cacheRecipe(recipe) {
            var cachedInfo = {
                recipe_id : recipe.recipe_id,
                image_url: recipe.image_url
            }

            cachedRecipes.push(cachedInfo);
            return Promise.resolve(cachedInfo);
        }
    }


})();