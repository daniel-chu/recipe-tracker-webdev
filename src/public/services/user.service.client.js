(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($rootScope, $location, $http, recipeService) {
        // temp counter for prototype
        var userIdCounter = 3;
        var followIdCounter = 1;

        var curUser;

        var users = [{
                _id: '1',
                username: 'alice',
                password: 'alice',
                likedRecipes: [],
                sharedRecipes: []
            },
            {
                _id: '2',
                username: 'bob',
                password: 'bob',
                likedRecipes: [],
                sharedRecipes: []
            }
        ]

        var userFollows = [
            { _id: '1', userId: '1', followedUserId: '2' }
        ]

        var api = {
            login: login,
            logout: logout,
            createUser: createUser,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            createFollowFromUserToUser: createFollowFromUserToUser,
            likeRecipeForUser: likeRecipeForUser,
            shareRecipeForUser: shareRecipeForUser,
            getLoggedInUser: getLoggedInUser
        }

        return api;

        function login(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (username === users[i].username) {
                    if (password === users[i].password) {
                        return setLoggedInUser(users[i]);
                    }
                    break;
                }
            }

            return Promise.resolve(null);
        }

        function logout() {
            return setLoggedInUser(null);
        }

        function createUser(userInfo) {
            userInfo._id = (userIdCounter++).toString();

            users.push(userInfo);
            return setLoggedInUser(userInfo);
        }

        function updateUser(userId, userInfo) {
            for (var i = 0; i < users.length; i++) {
                if (userId === users[i]._id) {
                    users[i] = userInfo;
                    return Promise.resolve(users[i]);
                }
            }
            return Promise.resolve(null);
        }

        function findUserByUsername(username) {
            for (var i = 0; i < users.length; i++) {
                if (username === users[i].username) {
                    return Promise.resolve(angular.copy(users[i]));
                }
            }
            return Promise.resolve(null);
        }

        function createFollowFromUserToUser(userId, followedUserId) {
            var relationship = {
                _id: (followIdCounter++).toString(),
                userId: userId,
                followedUserId: followedUserId
            }

            userFollows.push(relationship);
            return Promise.resolve(relationship);
        }

        function likeRecipeForUser(recipe, userId) {
            for (var i = 0; i < users.length; i++) {
                if (userId === users[i]._id) {
                    users[i].likedRecipes.push(recipe.recipe_id);
                    return recipeService.cacheRecipe(recipe).then(function() {
                        return users[i];
                    });
                }
            }
        }

        function shareRecipeForUser(recipe, userId) {
            for (var i = 0; i < users.length; i++) {
                if (userId === users[i]._id) {
                    users[i].sharedRecipes.push(recipe.recipe_id);
                    return recipeService.cacheRecipe(recipe).then(function() {
                        return users[i];
                    });
                }
            }
        }

        function getLoggedInUser() {
            return Promise.resolve(curUser);
        }

        //TODO temporarily here for the prototype
        function setLoggedInUser(userInfo) {
            curUser = angular.copy(userInfo);
            return Promise.resolve(curUser);
        }

    }
})();