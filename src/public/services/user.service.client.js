(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($rootScope, $location, $http, recipeService, activityService) {
        var api = {
            login: login,
            logout: logout,
            getLoggedInUser: getLoggedInUser,

            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            validatePassword: validatePassword,
            updatePassword: updatePassword,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,

            createFollowFromUserToUser: createFollowFromUserToUser,
            deleteFollowFromUserToUser: deleteFollowFromUserToUser,

            likeRecipeForUser: likeRecipeForUser,
            shareRecipeForUser: shareRecipeForUser,
            unlikeRecipeForUser: unlikeRecipeForUser,
            unshareRecipeForUser: unshareRecipeForUser,

            getUsersFollowing: getUsersFollowing,
            getFollowers: getFollowers,

            isUserFollowingUser: isUserFollowingUser,
            getLikedRecipesForUser: getLikedRecipesForUser,
            getSharedRecipesForUser: getSharedRecipesForUser,

            didUserLikeRecipe: didUserLikeRecipe,
            didUserShareRecipe: didUserShareRecipe
        }

        return api;

        function login(username, password) {
            var url = '/api/login';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    username: username,
                    password: password
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function logout() {
            var url = '/api/logout';
            return $http({
                method: 'POST',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function getLoggedInUser() {
            var url = '/api/getLoggedInUser';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function createUser(user) {
            var url = '/api/user';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    user: user
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    user: user
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function validatePassword(password) {
            var url = '/api/validatepw';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    password: password
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function updatePassword(newPassword) {
            var url = '/api/updatePassword';
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    newPassword: newPassword
                }
            }).then(function(response) {
                return response.data;
            })
        }

        function findUserByUsername(username) {
            var url = '/api/user';
            return $http({
                method: 'GET',
                url: url,
                params: {
                    username: username
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function findAllUsers() {
            var url = '/api/users';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function createFollowFromUserToUser(userId, followedUserId) {
            var url = '/api/user/' + userId + '/follow/' + followedUserId;
            return $http({
                method: 'POST',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteFollowFromUserToUser(userId, followedUserId) {
            var url = '/api/user/' + userId + '/follow/' + followedUserId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function likeRecipeForUser(recipe, userId) {
            return recipeService.storeRecipeIfNotExist(recipe).then(function(recipe) {
                return activityService.createActivity(userId, 'LIKE', recipe.recipe_id)
                    .then(function(activity) {
                        var url = '/api/user/' + userId + '/like/' + recipe.recipe_id;
                        return $http({
                            method: 'POST',
                            url: url
                        });
                    });
            });
        }

        function shareRecipeForUser(recipe, userId) {
            return recipeService.storeRecipeIfNotExist(recipe).then(function(recipe) {
                return activityService.createActivity(userId, 'SHARE', recipe.recipe_id)
                    .then(function(activity) {
                        var url = '/api/user/' + userId + '/share/' + recipe.recipe_id;
                        return $http({
                            method: 'POST',
                            url: url
                        });
                    });
            });
        }

        function unlikeRecipeForUser(recipe, userId) {
            return activityService.deleteActivity(userId, 'LIKE', recipe.recipe_id)
                .then(function(activity) {
                    var url = '/api/user/' + userId + '/like/' + recipe.recipe_id;
                    return $http({
                        method: 'DELETE',
                        url: url
                    });
                });
        }

        function unshareRecipeForUser(recipe, userId) {
            return activityService.deleteActivity(userId, 'SHARE', recipe.recipe_id)
                .then(function(activity) {
                    var url = '/api/user/' + userId + '/share/' + recipe.recipe_id;
                    return $http({
                        method: 'DELETE',
                        url: url
                    });
                });
        }

        // gets who the user is following
        function getUsersFollowing(userId) {
            var url = '/api/user/' + userId + '/following';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        // gets the users followers
        function getFollowers(userId) {
            var url = '/api/user/' + userId + '/followers';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function isUserFollowingUser(userId1, userId2) {
            var url = '/api/user/checkFollow/' + userId1 + '/' + userId2;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function getLikedRecipesForUser(userId) {
            var url = '/api/user/' + userId + '/likedRecipes';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function getSharedRecipesForUser(userId) {
            var url = '/api/user/' + userId + '/sharedRecipes';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function didUserLikeRecipe(userId, recipeId) {
            var url = '/api/user/' + userId + '/checkLike/' + recipeId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function didUserShareRecipe(userId, recipeId) {
            var url = '/api/user/' + userId + '/checkShare/' + recipeId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();