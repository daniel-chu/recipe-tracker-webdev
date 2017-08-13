(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($location, $http) {

        var api = {
            getLoggedInUser: getLoggedInUser,
            setLoggedInUser: setLoggedInUser
        }

        return api;

        var curUser;

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