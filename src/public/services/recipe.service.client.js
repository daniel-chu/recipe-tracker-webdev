(function() {
    angular.module('RecipEat')
        .factory('recipeService', recipeService);

    function recipeService($http) {

        var cachedRecipes = {
            '35120': {
                recipe_id: '35120',
                title: 'Bacon Wrapped Jalapeno Popper Stuffed Chicken',
                image_url: 'http://static.food2fork.com/Bacon2BWrapped2BJalapeno2BPopper2BStuffed2BChicken2B5002B5909939b0e65.jpg'
            },
            '2803': {
                recipe_id: '2803',
                title: 'Banana Crumb Muffins',
                image_url: 'http://static.food2fork.com/124030cedd.jpg'
            }
        };

        var api = {
            searchRecipe: searchRecipe,
            getRecipeDetails: getRecipeDetails,
            cacheRecipe: cacheRecipe,
            getCachedRecipeInfo: getCachedRecipeInfo
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

        function cacheRecipe(recipe) {
            cachedRecipes[recipe.recipe_id] = {
                recipe_id: recipe.recipe_id,
                title: recipe.title,
                image_url: recipe.image_url
            }

            return Promise.resolve(cachedRecipes[recipe.recipe_id]);
        }

        function getCachedRecipeInfo(recipeIds) {
            var recipeInfo = [];

            for (var i = 0; i < recipeIds.length; i++) {
                var recipe = cachedRecipes[recipeIds[i]];
                if(recipe) {
                    recipeInfo.push(recipe);
                }
            }

            return Promise.resolve(recipeInfo);
        }
    }


})();