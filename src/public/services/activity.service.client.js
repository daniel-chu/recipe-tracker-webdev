(function() {
    angular.module('RecipEat')
        .factory('activityService', activityService);

    function activityService($http) {

        var api = {
            createActivity: createActivity,
            deleteActivity: deleteActivity,
            getXActivitiesForUser: getXActivitiesForUser,
            getXActivitiesGlobal: getXActivitiesGlobal
        }

        return api;

        function createActivity(userId, action, recipeId) {
            var url = '/api/activity/' + userId + '/' + recipeId
            return $http({
                method: 'POST',
                url: url,
                params: {
                    action: action
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteActivity(userId, action, recipeId) {
            var url = '/api/activity/' + userId + '/' + recipeId
            return $http({
                method: 'DELETE',
                url: url,
                params: {
                    action: action
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function getXActivitiesForUser(start, end, userId) {
            var url = '/api/user/' + userId + '/activity'
            return $http({
                method: 'GET',
                url: url,
                params: {
                    start: start,
                    end: end
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function getXActivitiesGlobal(start, end) {
            var url = '/api/activity';
            return $http({
                method: 'GET',
                url: url,
                params: {
                    start: start,
                    end: end
                }
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();