(function() {
    angular.module('RecipEat')
        .controller('loginController', loginController)

    function loginController($rootScope, $location, userService) {
        var vm = this;
        vm.login = login;
        vm.returnToPreviousPage = returnToPreviousPage;

        function login(userInfo) {
            if (userInfo) {
                userService.login(userInfo.username, userInfo.password)
                    .then(function(user) {
                        if (user) {
                            $rootScope.loggedIn = true;
                            returnToPreviousPage();
                        } else {
                            vm.error = 'Invalid username/password.';
                        }
                        $rootScope.$apply();
                    });
            }
        }

        function returnToPreviousPage() {
            var returnUrl = $rootScope.previousUrl || "";
            $location.url(returnUrl);
        }

    }

})();