(function() {
    angular
        .module('RecipeTracker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/test/templates/test-homepage.view.client.html'
            }).when('/testNutritionix', {
                templateUrl: 'views/test/templates/nutritionixTestSearch.view.client.html',
                controller: 'nutritionixTestSearchController',
                controllerAs: 'model'
            }).when('/testFood2Fork', {
                templateUrl: 'views/test/templates/food2ForkTestSearch.view.client.html',
                controller: 'food2ForkTestSearchController',
                controllerAs: 'model'
            }).when('/testNutritionix/nutritionInfo/:nid', {
                templateUrl: 'views/test/templates/nutritionDetails.view.client.html',
                controller: 'nutritionDetailsController',
                controllerAs: 'model'
            }).when('/testFood2Fork/recipe/:rid', {
                templateUrl: 'views/test/templates/recipeDetails.view.client.html',
                controller: 'recipeDetailsController',
                controllerAs: 'model'
            });
    }

})();