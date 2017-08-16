(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($rootScope, $location, $http, recipeService) {
        var api = {
            login: login,
            logout: logout,
            getLoggedInUser: getLoggedInUser,

            createUser: createUser,
            updateUser: updateUser,
            validatePassword: validatePassword,
            updatePassword: updatePassword,
            findUserByUsername: findUserByUsername,

            createFollowFromUserToUser: createFollowFromUserToUser,
            likeRecipeForUser: likeRecipeForUser,
            shareRecipeForUser: shareRecipeForUser,

            getUsersFollowing: getUsersFollowing,
            getFollowers: getFollowers,

            isUserFollowingUser: isUserFollowingUser,
            getLikedRecipesForUser: getLikedRecipesForUser,
            getSharedRecipesForUser: getSharedRecipesForUser
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

        function createFollowFromUserToUser(userId, followedUserId) {
            var url = '/api/user/' + userId + '/follow/' + followedUserId;
            return $http({
                method: 'POST',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function likeRecipeForUser(recipe, userId) {
            return recipeService.storeRecipeIfNotExist(recipe).then(function(recipe) {
                var url = '/api/user/' + userId + '/like/' + recipe._id;
                return $http({
                    method: 'POST',
                    url: url
                });
            });
        }

        function shareRecipeForUser(recipe, userId) {
            return recipeService.storeRecipeIfNotExist(recipe).then(function(recipe) {
                var url = '/api/user/' + userId + '/share/' + recipe._id;
                return $http({
                    method: 'POST',
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

    }
})();