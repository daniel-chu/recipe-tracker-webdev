(function() {
    angular.module('recipeatDirectives', [])
        .directive('recipeatNavbar', ['$location', 'userService', recipeatNavbar]);

    function recipeatNavbar($location, userService) {
        return {
            templateUrl: 'directives/recipeat-navbar/recipeat-navbar.html',
            link: function(scope, elem, attrs) {
                $('#navbar-search-recipe-button').on('click', function() {
                    scope.$apply(function() {
                        $location.url('/search/recipe/' + scope.searchText);
                        if ($('#collapsible-navigationbar').hasClass('collapse in')) {
                            $('.navbar-toggle').click();
                        }
                    });
                });

                userService.getLoggedInUser().then(function(user) {
                    $('#nav-bar-user-name').text(user.username);
                });
            }
        }
    }

})();