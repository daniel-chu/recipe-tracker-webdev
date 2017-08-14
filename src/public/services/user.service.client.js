(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($rootScope, $location, $http) {
        // temp counter for prototype
        var userIdCounter = 3;
        var followIdCounter = 1;

        var curUser;

        var users = [
            { _id: '1', username: 'alice', password: 'alice' },
            { _id: '2', username: 'bob', password: 'bob' }
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
                    return Promise.resolve(users[i]);
                }
            }
            return Promise.resolve(null);
        }

        function createFollowFromUserToUser(user1, user2) {
            var relationship = {
                _id: (followIdCounter++).toString(),
                userId: user1._id,
                followedUserId: user2._id
            }

            userFollows.push(relationship);
            return Promise.resolve(relationship);
        }

        function getLoggedInUser() {
            return Promise.resolve(curUser);
        }

        //TODO temporarily here for the prototype
        function setLoggedInUser(userInfo) {
            curUser = userInfo;
            return Promise.resolve(curUser);
        }

    }
})();