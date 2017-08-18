(function() {
    angular.module('RecipEat')
        .controller('homePageController', homePageController);

    function homePageController($location, activityService, loggedInUser) {
        var vm = this;
        vm.user = loggedInUser;

        function init() {
            if (vm.user) {
                activityService.getXActivitiesForUser(0, 9, vm.user._id).then(function(activities) {
                    console.log(activities);
                });
            }
        }

        init();
    }

})();