(function() {
    angular.module('RecipEat')
        .service('userService', userService);

    function userService($location, $http) {

        var api = {
            getLoggedInUser: getLoggedInUser
        }

        return api;

        function getLoggedInUser() {
            var testUser = {
                username: 'testUser',
                firstName: 'Test',
                lastName: 'User'
            }
            
            return Promise.resolve(testUser);
        }
    }
})();