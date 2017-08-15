(function() {
    angular
        .module('RecipEat')
        .config(configuration)
        .run(function($rootScope, $location, $window) {
            $('.fading-popup-message .close').on('click', function() {
                $('.fading-popup-message').stop({ clearQueue: true }).fadeOut(200);
            });

            $rootScope.displayFadeWarning = function(message) {
                var $warningMessage = $('#fading-warning-message');
                $warningMessage.hide().stop({ clearQueue: true });

                $('#fading-warning-message p').text(message);
                $warningMessage.fadeIn(2000, function() {
                    $warningMessage.delay(5000).fadeOut(2000);
                })
            }

            $rootScope.collapseNavbar = function() {
                if ($('#collapsible-navigationbar').hasClass('collapse in')) {
                    $('.navbar-toggle').click();
                };
            }

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                $rootScope.collapseNavbar();
                $window.scrollTo(0, 0);
            });
        });

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/homepage/templates/homepage.view.client.html'
            })
            .when('/search/recipe/:recipeSearchText', {
                templateUrl: 'views/recipe/templates/recipeSearch.view.client.html',
                controller: 'recipeSearchController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model',
                resolve: {
                    check: isNotLoggedIn
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model',
                resolve: {
                    check: isNotLoggedIn
                }
            })
            .when('/profile/:username', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser: getLoggedInUser
                }
            })
            .when('/settings', {
                templateUrl: 'views/user/templates/settings.view.client.html',
                controller: 'settingsController',
                controllerAs: 'model',
                resolve: {
                    check: isLoggedIn
                }
            })
            .when('/recipe/:recipeId', {
                templateUrl: 'views/recipe/templates/recipeDetails.view.client.html',
                controller: 'recipeDetailsController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser: getLoggedInUser
                }
            })




            .when('/testNutritionix', {
                templateUrl: 'views/test/templates/nutritionixTestSearch.view.client.html',
                controller: 'nutritionixTestSearchController',
                controllerAs: 'model'
            })
            .when('/testNutritionix/nutritionInfo/:nid', {
                templateUrl: 'views/test/templates/nutritionDetails.view.client.html',
                controller: 'nutritionDetailsController',
                controllerAs: 'model'
            })
            .otherwise({
                templateUrl: 'views/error/templates/pageNotFound.view.client.html'
            });

    }

    function isNotLoggedIn($rootScope, $location, userService) {
        return userService.getLoggedInUser()
            .then(function(user) {
                if (user) {
                    $location.url('');
                    $rootScope.displayFadeWarning('You are already logged in.')
                    return false;
                }
                return true;
            });
    }

    function isLoggedIn($rootScope, $location, userService) {
        return userService.getLoggedInUser()
            .then(function(user) {
                if (!user) {
                    $rootScope.previousUrl = $location.url();
                    $location.url('/login');
                    $rootScope.displayFadeWarning('Please log in first.')
                    return null;
                }
                return user;
            });
    }

    function getLoggedInUser(userService) {
        return userService.getLoggedInUser()
            .then(function(user) {
                return user;
            });
    }

})();