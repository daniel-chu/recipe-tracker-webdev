(function() {
    angular
        .module('RecipEat')
        .config(configuration)
        .run(function($rootScope, $location, $window, userService) {
            userService.getLoggedInUser().then(function(user) {
                if (user) {
                    $rootScope.loggedIn = true;
                } else {
                    $rootScope.loggedIn = false;
                }
            });

            $('.fading-popup-message .close').on('click', function() {
                $('.fading-popup-message').stop({ clearQueue: true }).fadeOut(200);
            });

            $rootScope.displayFadeWarning = function(message) {
                var $warningMessage = $('#fading-warning-message');
                $warningMessage.hide().stop({ clearQueue: true });

                $('#fading-warning-message p').text(message);
                $warningMessage.fadeIn(2000, function() {
                    $warningMessage.delay(5000).fadeOut(2000);
                });
            }

            $rootScope.displayFadeDanger = function(message) {
                var $dangerMessage = $('#fading-danger-message');
                $dangerMessage.hide().stop({ clearQueue: true });

                $('#fading-danger-message p').text(message);
                $dangerMessage.fadeIn(2000, function() {
                    $dangerMessage.delay(5000).fadeOut(2000);
                });
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
                templateUrl: 'views/homepage/templates/homepage.view.client.html',
                controller: 'homePageController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser: getLoggedInUser
                }
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
            .when('/profile', {
                resolveRedirectTo: redirectToLoggedInUserProfile
            })
            .when('/profile/:username', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser: getLoggedInUser
                }
            })
            .when('/editProfile', {
                templateUrl: 'views/user/templates/editProfile.view.client.html',
                controller: 'editProfileController',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: isLoggedIn
                }
            })
            .when('/settings', {
                templateUrl: 'views/user/templates/settings.view.client.html',
                controller: 'settingsController',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: isLoggedIn
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
            .when('/admin', {
                templateUrl: 'views/admin/templates/adminPanel.view.client.html',
                controller: 'adminPanelController',
                controllerAs: 'model',
                resolve: {
                    admin: checkAdmin
                }
            })
            .when('/admin/edit/:username', {
                templateUrl: 'views/admin/templates/adminEditUser.view.client.html',
                controller: 'adminEditUserController',
                controllerAs: 'model',
                resolve: {
                    admin: checkAdmin
                }
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

    function checkAdmin($rootScope, $location, userService) {
        return userService.getLoggedInUser()
            .then(function(user) {
                if (user.role !== 'ADMIN') {
                    $location.url('');
                    $rootScope.displayFadeDanger('Unauthorized to view this page.')
                    return null;
                }
                return user;
            });
    }

    function redirectToLoggedInUserProfile(userService) {
        return getLoggedInUser(userService).then(function(user) {
            if (user) {
                return '/profile/' + user.username;
            }
            return '/login'
        });
    }

})();