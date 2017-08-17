(function() {
    angular.module('RecipEat')
        .controller('adminPanelController', adminPanelController);

    function adminPanelController(userService) {
        var vm = this;
        vm.deleteUser = deleteUser;

        function init() {
            findAllUsers();
        }

        function deleteUser(user) {
            var confirmation = confirm("Are you sure you want to delete " + user.username + "?");
            if (confirmation) {
                userService.deleteUser(user._id).then(function(users) {
                    findAllUsers();
                });
            }
        }

        function findAllUsers() {
            userService.findAllUsers().then(function(users) {
                vm.users = users;
            });
        }

        init();
    }

})();