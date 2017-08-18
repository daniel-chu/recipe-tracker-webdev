(function() {
    angular.module('RecipEat')
        .factory('commentService', commentService);

    function commentService($http, recipeService) {

        var api = {
            getCommentsForRecipe: getCommentsForRecipe,
            postCommentForRecipeForUser: postCommentForRecipeForUser,
            editComment: editComment,
            deleteComment: deleteComment
        }

        return api;

        function getCommentsForRecipe(recipeId) {
            return $http({
                method: 'GET',
                url: '/api/recipe/' + recipeId + '/comment'
            }).then(function(response) {
                return response.data;
            });
        }

        function postCommentForRecipeForUser(comment, recipe, userId) {
            return recipeService.storeRecipeIfNotExist(recipe).then(function(recipe) {
                var url = '/api/recipe/' + recipe.recipe_id + '/comment';
                return $http({
                    method: 'POST',
                    url: url,
                    data: {
                        comment: comment,
                        userId: userId
                    }
                }).then(function(response) {
                    return response.data;
                });
            });

        }

        function editComment(commentId, comment, recipeId) {
            return $http({
                method: 'PUT',
                url: '/api/recipe/' + recipeId + '/comment/' + commentId,
                data: {
                    comment: comment
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteComment(commentId, recipeId) {
            return $http({
                method: 'DELETE',
                url: '/api/recipe/' + recipeId + '/comment/' + commentId
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();