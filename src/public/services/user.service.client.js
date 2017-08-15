(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($rootScope, $location, $http, recipeService) {
        // temp counter for prototype
        var userIdCounter = 3;
        var followIdCounter = 1;

        var curUserId;

        var users = [{
                _id: '1',
                username: 'alice',
                password: 'alice',
                sharedRecipes: ['35120'],
                likedRecipes: ['2803']
            },
            {
                _id: '2',
                username: 'bob',
                password: 'bob',
                sharedRecipes: [],
                likedRecipes: []
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
            getLoggedInUser: getLoggedInUser,

            createFollowFromUserToUser: createFollowFromUserToUser,
            likeRecipeForUser: likeRecipeForUser,
            shareRecipeForUser: shareRecipeForUser,

            getUsersFollowing: getUsersFollowing,
            getFollowers: getFollowers
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

        function getLoggedInUser() {
            return Promise.resolve(getUserByUserId(curUserId));
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

        function getUsersFollowing(userId) {
            var usersFollowing = [];

            for (var i = 0; i < userFollows.length; i++) {
                if (userId === userFollows[i].userId) {
                    usersFollowing.push(getUserByUserId(userFollows[i].followedUserId));
                }
            }

            return Promise.resolve(usersFollowing);
        }

        function getFollowers(userId) {
            var followers = [];

            for (var i = 0; i < userFollows.length; i++) {
                if (userId === userFollows[i].followedUserId) {
                    followers.push(getUserByUserId(userFollows[i].userId));
                }
            }

            return Promise.resolve(followers);
        }

        // temporary helper while this stuff is on client side for prototype
        function getUserByUserId(userId) {
            for (var i = 0; i < users.length; i++) {
                if (userId === users[i]._id) {
                    return users[i];
                }
            }
            return null;
        }

        //TODO temporarily here for the prototype
        function setLoggedInUser(userInfo) {
            curUserId = userInfo ? userInfo._id : null;
            return Promise.resolve(getUserByUserId(curUserId));
        }

    }
})();