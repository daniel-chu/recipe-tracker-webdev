var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server.js');
var UserModel = mongoose.model('UserModel', UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByFacebookId = findUserByFacebookId;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.getLikedRecipesForUser = getLikedRecipesForUser;
UserModel.getSharedRecipesForUser = getSharedRecipesForUser;
UserModel.likeRecipeForUser = likeRecipeForUser;
UserModel.shareRecipeForUser = shareRecipeForUser;

module.exports = UserModel;

function createUser(user) {
    return UserModel.create(user).then(function(newUser) {
        return newUser;
    });
}

function findUserById(userId) {
    return UserModel.findOne({ _id: userId }).then(function(user) {
        return user;
    });
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).then(function(user) {
        return user;
    });
}

function findUserByFacebookId(facebookId) {
    return UserModel.findOne({ "facebook.id" : facebookId}).then(function(user) {
        return user;
    });
}

function updateUser(userId, user) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true }).then(function(updatedUser) {
        return updatedUser;
    });
}

function deleteUser(userId) {
    return UserModel.findOneAndRemove({ _id: userId }).then(function(deletedUser) {
        return deletedUser;
    });
}

function getLikedRecipesForUser(userId) {
    return UserModel.findOne({ _id: userId })
        .populate('likedRecipes')
        .exec()
        .then(function(user) {
            return user.likedRecipes;
        });
}

function getSharedRecipesForUser(userId) {
    return UserModel.findOne({ _id: userId })
        .populate('sharedRecipes')
        .exec()
        .then(function(user) {
            return user.sharedRecipes;
        });
}

function likeRecipeForUser(userId, recipeId) {
    return findUserById(userId).then(function(user) {
        user.likedRecipes.push(recipeId);
        return user.save();
    });
}

function shareRecipeForUser(userId, recipeId) {
    return findUserById(userId).then(function(user) {
        user.sharedRecipes.push(recipeId);
        return user.save();
    });
}