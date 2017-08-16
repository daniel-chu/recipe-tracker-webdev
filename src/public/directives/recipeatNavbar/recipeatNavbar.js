(function() {
    angular.module('recipeatDirectives', [])
        .directive('recipeatNavbar', ['$location', 'userService', recipeatNavbar]);

    function recipeatNavbar($location, userService) {

        var controller = function($scope, $rootScope, $location) {
            $scope.searchRecipe = searchRecipe;
            $scope.redirectToLogin = redirectToLogin;
            $scope.redirectToRegister = redirectToRegister;
            $scope.logout = logout;
            $scope.user;

            $scope.$watch('loggedIn', function() {
                if ($rootScope.loggedIn) {
                    userService.getLoggedInUser().then(function(user) {
                        if (user) {
                            $('#nav-bar-user-name').text(user.username);
                        }
                        $scope.user = user;
                    });
                }
            });

            function searchRecipe() {
                if ($scope.recipeSearchText) {
                    $location.url('/search/recipe/' + $scope.recipeSearchText);
                }
            }

            function redirectToLogin() {
                var route = $location.url();
                if (route !== '/login' && route !== '/register') {
                    $rootScope.previousUrl = $location.url();
                }
                $location.url('/login');
            }

            function redirectToRegister() {
                var route = $location.url();
                if (route !== '/login' && route !== '/register') {
                    $rootScope.previousUrl = $location.url();
                }
                $location.url('/register');
            }

            function logout() {
                userService.logout().then(function() {
                    $rootScope.loggedIn = false;

                    $rootScope.collapseNavbar();
                    $location.url('/');
                });
            }
        }

        return {
            controller: controller,
            templateUrl: 'directives/recipeatNavbar/recipeatNavbar.html'
        }
    }



})();