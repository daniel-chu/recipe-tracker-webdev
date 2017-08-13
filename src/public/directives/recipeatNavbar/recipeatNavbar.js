(function() {
    angular.module('recipeatDirectives', [])
        .directive('recipeatNavbar', ['$location', 'userService', recipeatNavbar]);

    function recipeatNavbar($location, userService) {

        var controller = function($scope, $rootScope, $location) {
            $scope.searchRecipe = searchRecipe;
            $scope.redirectToLogin = redirectToLogin;
            $scope.redirectToRegister = redirectToRegister;

            $scope.$watch('loggedIn', function() {
                if ($rootScope.loggedIn) {
                    userService.getLoggedInUser().then(function(user) {
                        if (user) {
                            $('#nav-bar-user-name').text(user.username);
                        }
                    });
                }
            });

            function searchRecipe() {
                if ($scope.recipeSearchText) {
                    $location.url('/search/recipe/' + $scope.recipeSearchText);
                }
            }

            function redirectToLogin() {
                $rootScope.previousUrl = $location.url();
                $location.url('/login');
            }

            function redirectToRegister() {
                $rootScope.previousUrl = $location.url();
                $location.url('/register');
            }


        }

        return {
            controller: controller,
            templateUrl: 'directives/recipeatNavbar/recipeatNavbar.html'
        }
    }



})();