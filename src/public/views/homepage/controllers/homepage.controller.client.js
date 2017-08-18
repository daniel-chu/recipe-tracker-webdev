(function() {
    angular.module('RecipEat')
        .controller('homePageController', homePageController);

    function homePageController($location, activityService, loggedInUser) {
        var vm = this;
        vm.user = loggedInUser;
        vm.createActivityBoxHeader = createActivityBoxHeader;

        function init() {
            if (vm.user) {
                activityService.getXActivitiesForUser(0, 11, vm.user._id).then(function(activities) {
                    vm.activities = activities;
                });
            }
        }

        function createActivityBoxHeader(username, action) {
            console.log(username)
            var header = username + ' ';
            if (action === 'LIKE') {
                header += 'liked...';
            } else if (action === 'SHARE') {
                header += 'shared...';
            }
            return header;
        }

        init();
    }

})();