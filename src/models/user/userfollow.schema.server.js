var mongoose = require('mongoose');

var UserFollowSchema = mongoose.Schema({
    userFollowing: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'userfollow' });

module.exports = UserFollowSchema;