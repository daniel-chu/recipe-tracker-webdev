(function() {
    angular.module('RecipEat')
        .controller('loginController', loginController)

    function loginController($rootScope, $location, userService) {
        var vm = this;
        vm.login = login;

        function login(userInfo) {
            console.log('LOGGING IN WITH USERNAME: ' + userInfo.username + '\nPASSWORD: ' + userInfo.password);

            userService.setLoggedInUser(userInfo)
                .then(function(user) {
                    if (user) {
                        $rootScope.loggedIn = true;
                        var returnUrl = $rootScope.previousUrl || "";
                        $location.url(returnUrl);

                        $rootScope.$apply();
                    }
                });
        }

    }

})();