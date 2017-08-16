(function() {
    angular.module('RecipEat')
        .factory('recipeService', recipeService);

    function recipeService($http) {

        var api = {
            searchRecipe: searchRecipe,
            getRecipeDetails: getRecipeDetails,
            storeRecipeIfNotExist: storeRecipeIfNotExist,
            findRecipeInfo: findRecipeInfo
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
                return response.data;
            });
        }

        function storeRecipeIfNotExist(recipe) {
            return findRecipeInfo(recipe.recipe_id).then(function(existingRecipe) {
                if (existingRecipe) {
                    return existingRecipe;
                }
                return storeRecipe(recipe);
            });
        }

        function findRecipeInfo(recipeId) {
            return $http({
                method: 'GET',
                url: '/api/recipe/' + recipeId
            }).then(function(response) {
                return response.data;
            });
        }

        function storeRecipe(recipe) {
            var recipeInfo = {
                _id: recipe.recipe_id,
                title: recipe.title,
                image_url: recipe.image_url
            }

            return $http({
                method: 'POST',
                url: '/api/recipe/' + recipe.recipe_id,
                data: {
                    recipeInfo: recipeInfo
                }
            }).then(function(response) {
                return response.data;
            });
        }
    }
})();