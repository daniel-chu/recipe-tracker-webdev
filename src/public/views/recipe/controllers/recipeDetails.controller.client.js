(function() {
    angular.module('RecipEat')
        .controller('recipeDetailsController', recipeDetailsController);

    function recipeDetailsController($routeParams, userService, recipeService, commentService, loggedInUser) {
        vm = this;
        vm.recipeId = $routeParams['recipeId'];
        vm.likeRecipe = likeRecipe;
        vm.shareRecipe = shareRecipe;
        vm.unlikeRecipe = unlikeRecipe;
        vm.unshareRecipe = unshareRecipe;

        vm.postComment = postComment;
        vm.isAllowedToDelete = isAllowedToDelete;
        vm.deleteComment = deleteComment;

        function init() {
            recipeService.getRecipeDetails(vm.recipeId).then(function(result) {
                vm.recipe = result.recipe;
                if (loggedInUser) {
                    userService.didUserLikeRecipe(loggedInUser._id, vm.recipeId).then(function(isLiked) {
                        vm.isRecipeLiked = isLiked;
                    });

                    userService.didUserShareRecipe(loggedInUser._id, vm.recipeId).then(function(isShared) {
                        vm.isRecipeShared = isShared;
                    });
                }
                retrieveComments();
            });
        }

        function likeRecipe(recipe) {
            userService.likeRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeLiked = true;
            });
        }

        function shareRecipe(recipe) {
            userService.shareRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeShared = true;
            });
        }

        function unlikeRecipe(recipe) {
            userService.unlikeRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeLiked = false;
            });
        }

        function unshareRecipe(recipe) {
            userService.unshareRecipeForUser(recipe, loggedInUser._id).then(function() {
                vm.isRecipeShared = false;
            });
        }

        function postComment(comment) {
            commentService.postCommentForRecipeForUser(comment, vm.recipe, loggedInUser._id)
                .then(function(comment) {
                    $('#newComment').text('');
                    retrieveComments();
                });
        }

        function isAllowedToDelete(username) {
            return username === loggedInUser.username || loggedInUser.role === 'ADMIN';
        }

        function deleteComment(commentId) {
            var confirmation = confirm('Are you sure you want to delete this comment?');
            if (confirmation) {
                commentService.deleteComment(commentId, vm.recipe.recipe_id)
                    .then(function() {
                        retrieveComments();
                    });
            }
        }

        function retrieveComments() {
            commentService.getCommentsForRecipe(vm.recipeId)
                .then(function(comments) {
                    vm.comments = comments;
                });
        }

        init();
    }

})();