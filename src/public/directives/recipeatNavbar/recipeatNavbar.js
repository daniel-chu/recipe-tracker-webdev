(function() {
    angular.module('recipeatDirectives', [])
        .directive('recipeatNavbar', ['$location', 'userService', recipeatNavbar]);

    function recipeatNavbar($location, userService) {

        var controller = function($scope, $rootScope, $window, $location) {
            $scope.searchRecipe = searchRecipe;
            $scope.redirectToLogin = redirectToLogin;
            $scope.redirectToRegister = redirectToRegister;
            $scope.isOnLandingPage = isOnLandingPage;
            $scope.goBack = goBack;
            $scope.logout = logout;
            $scope.user;

            $rootScope.updateNavbar = function() {
                if ($rootScope.loggedIn) {
                    userService.getLoggedInUser().then(function(user) {
                        if (user) {
                            if (user.username.length <= 16) {
                                $('#nav-bar-user-name').text(user.username);
                            }
                            $rootScope.isUserAdmin = (user.role === 'ADMIN');
                        }
                        $scope.user = user;
                    });
                }
            }

            $scope.$watch('loggedIn', $rootScope.updateNavbar);

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

            function isOnLandingPage() {
                return $location.url() === '/';
            }

            function goBack() {
                if ($window.document.referrer.indexOf($location.host()) !== -1) {
                    $window.history.back();
                } else {
                    $location.url('/');
                }
            }

            function logout() {
                userService.logout().then(function() {
                    $rootScope.loggedIn = false;
                    $('#nav-bar-user-name').text('');

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