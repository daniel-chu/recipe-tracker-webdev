var mongoose = require('mongoose');
var UserFollowSchema = require('./userfollow.schema.server');
var UserFollowModel = mongoose.model('UserFollowModel', UserFollowSchema);

UserFollowModel.createFollowBetweenUserAndUser = createFollowBetweenUserAndUser;
UserFollowModel.deleteFollowBetweenUserAndUser = deleteFollowBetweenUserAndUser;
UserFollowModel.getFollowBetweenUserAndUser = getFollowBetweenUserAndUser;
UserFollowModel.getAllFollowersForUser = getAllFollowersForUser;
UserFollowModel.getAllFollowingsForUser = getAllFollowingsForUser;

module.exports = UserFollowModel;

function createFollowBetweenUserAndUser(userFollowingId, userFollowedId) {
    var follow = {
        userFollowing: userFollowingId,
        userFollowed: userFollowedId
    }

    return UserFollowModel.create(follow).then(function(newFollow) {
        return newFollow;
    });
}

function deleteFollowBetweenUserAndUser(userFollowingId, userFollowedId) {
    var query = {
        userFollowing: userFollowingId,
        userFollowed: userFollowedId
    }

    return UserFollowModel.findOneAndRemove(query).then(function(deletedFollow) {
        return deletedFollow;
    });
}

function getFollowBetweenUserAndUser(userFollowingId, userFollowedId) {
    var query = {
        userFollowing: userFollowingId,
        userFollowed: userFollowedId
    }

    return UserFollowModel.findOne(query).then(function(follow) {
        return follow;
    });
}

function getAllFollowersForUser(userId) {
    return UserFollowModel.find({ userFollowed: userId })
        .populate('userFollowing')
        .exec()
        .then(function(follows) {
            var retrieveUserFollowing = function(follow) {
                return follow.userFollowing;
            }

            return follows.map(retrieveUserFollowing);
        });
}

function getAllFollowingsForUser(userId) {
    return UserFollowModel.find({ userFollowing: userId })
        .populate('userFollowed')
        .exec()
        .then(function(follows) {
            var retrieveUserFollowed = function(follow) {
                return follow.userFollowed;
            }

            return follows.map(retrieveUserFollowed);
        });
}