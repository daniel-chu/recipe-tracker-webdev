var mongoose = require('mongoose');

var ActivitySchema = require('./activity.schema.server.js');
var ActivityModel = mongoose.model('ActivityModel', ActivitySchema);
var UserFollowModel = require('../user/userfollow.model.server.js');

var activityCollectionLimit = 5000;

ActivityModel.createActivity = createActivity;
ActivityModel.deleteActivity = deleteActivity;
ActivityModel.getXActivitiesForUser = getXActivitiesForUser;
ActivityModel.getXActivitiesGlobal = getXActivitiesGlobal;

function createActivity(activity) {
    cleanUpActivityCollectionIfOverLimit();

    return ActivityModel.create(activity).then(function(newActivity) {
        return newActivity;
    });
}

function deleteActivity(activity) {
    return ActivityModel.remove(activity).then(function(deletedActivity) {
        return deletedActivity;
    });
}

// start begins from 0, where 0 is the most recent activity from one of the users the user is following
// end is the x-1 most recent activity
// so getXActivitiesForUser(0, 9, userId) will get the 10 most recent activities for the user with userId
function getXActivitiesForUser(start, end, userId) {
    return UserFollowModel.getAllUserIdsThisUserFollows(userId).then(function(userIdsThisUserFollows) {
        start = parseInt(start);
        end = parseInt(end);
        var limit = end - start + 1;

        return ActivityModel.find({ user: { $in: userIdsThisUserFollows } })
            .sort({ dateCreated: -1 })
            .skip(start)
            .limit(limit)
            .populate('recipe')
            .populate('user', 'username')
            .exec()
            .then(function(activities) {
                return activities;
            });
    });
}

// works the same way as for users, but finds the latest activities from any user
function getXActivitiesGlobal(start, end) {
    start = parseInt(start);
    end = parseInt(end);
    var limit = end - start + 1;

    return ActivityModel.find()
        .sort({ dateCreated: -1 })
        .skip(start)
        .limit(limit)
        .populate('recipe')
        .populate('user', 'username')
        .exec()
        .then(function(activities) {
            return activities;
        });
}

function cleanUpActivityCollectionIfOverLimit() {
    ActivityModel.count().then(function(count) {
        if (count > activityCollectionLimit) {
            ActivityModel.find()
                .sort({ dateCreated: 1 })
                .limit(activityCollectionLimit * 0.2)
                .exec()
                .then(function(activitiesToRemove) {
                    var ids = activitiesToRemove.map(function(activity) { return activity._id });
                    ActivityModel.remove({ _id: { $in: ids } }).exec();
                });
        }
    });
}

module.exports = ActivityModel;