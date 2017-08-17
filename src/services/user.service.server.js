var app = require('../../express');

var UserModel = require('../models/user/user.model.server.js');
var UserFollowModel = require('../models/user/userfollow.model.server.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcryptjs');

require('../configPassport')(passport, LocalStrategy, FacebookStrategy, GoogleStrategy, bcrypt, UserModel);

var auth = authorized;
var login = loginLocalFn;
var loginFb = loginFacebookFn;
var loginGoogle = loginGoogleFn;

app.post('/api/login', login);
app.get('/auth/facebook', loginFb);
app.get('/auth/google', loginGoogle);

app.post('/api/logout', logout);
app.get('/api/getLoggedInUser', getLoggedInUser);
app.post('/api/validatepw', validatePassword);
app.put('/api/updatePassword', updatePassword);

app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);

app.post('/api/user/:userId/follow/:followedUserId', createFollowFromUserToUser);
app.post('/api/user/:userId/unfollow/:followedUserId', deleteFollowFromUserToUser);
app.post('/api/user/:userId/like/:recipeId', likeRecipeForUser);
app.post('/api/user/:userId/share/:recipeId', shareRecipeForUser);

app.get('/api/user/:userId/following', getUsersFollowing);
app.get('/api/user/:userId/followers', getFollowers);
app.get('/api/user/checkFollow/:followingUserId/:followedUserId', isUserFollowingUser);
app.get('/api/user/:userId/likedRecipes', getLikedRecipesForUser);
app.get('/api/user/:userId/sharedRecipes', getSharedRecipesForUser);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#!/login' }),
    function(req, res) {
        res.redirect('/#!/profile/');
    });

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/#!/login' }),
    function(req, res) {
        res.redirect('/#!/profile/');
    });

function authorized(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function loginLocalFn(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (!user) {
            return res.send(null);
        }
        req.logIn(user, function(err) {
            return res.send(user);
        });
    })(req, res);
}

function loginFacebookFn(req, res) {
    passport.authenticate('facebook', function(err, user, info) {
        if (!user) {
            return res.send(null);
        }
        req.logIn(user, function(err) {
            return res.send(user);
        });
    })(req, res);
}

function loginGoogleFn(req, res) {
    passport.authenticate('google', { scope: ['profile', 'email'] }, function(err, user, info) {
        if (!user) {
            return res.send(null);
        }
        req.logIn(user, function(err) {
            return res.send(user);
        });
    })(req, res);
}

function logout(req, res) {
    req.logOut();
    return res.sendStatus(200);
}

function getLoggedInUser(req, res) {
    return res.send(req.isAuthenticated() ? req.user : null);
}

function validatePassword(req, res) {
    var password = req.body.password;
    var user = req.user;

    return res.send(bcrypt.compareSync(password, user.password));
}

function updatePassword(req, res) {
    var newPassword = req.body.newPassword;
    var user = req.user;

    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    UserModel.updateUser(user._id, user).then(function(user) {
        return res.send(user);
    });
}

function createUser(req, res) {
    var user = req.body.user;
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    UserModel.createUser(user)
        .then(function(newUser) {
            req.logIn(newUser, function(err) {
                return res.send(newUser);
            });
        });
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    UserModel.findUserByUsername(username).then(function(user) {
        return res.send(user);
    });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body.user;

    UserModel.updateUser(userId, user).then(function(status) {
        return res.sendStatus(204);
    });
}

function createFollowFromUserToUser(req, res) {
    var userId = req.params.userId;
    var followedUserId = req.params.followedUserId;

    UserFollowModel.createFollowBetweenUserAndUser(userId, followedUserId).then(function(follow) {
        return res.send(follow);
    });
}

function deleteFollowFromUserToUser(req, res) {
    var userId = req.params.userId;
    var followedUserId = req.params.followedUserId;

    UserFollowModel.deleteFollowBetweenUserAndUser(userId, followedUserId).then(function(deletedFollow) {
        return res.send(deletedFollow);
    });
}

function likeRecipeForUser(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;

    UserModel.likeRecipeForUser(userId, recipeId).then(function(user) {
        return res.send(user);
    });
}

function shareRecipeForUser(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;

    UserModel.shareRecipeForUser(userId, recipeId).then(function(user) {
        return res.send(user);
    });
}

function getUsersFollowing(req, res) {
    var userId = req.params.userId;

    UserFollowModel.getAllFollowingsForUser(userId).then(function(usersFollowing) {
        return res.send(usersFollowing);
    });
}

function getFollowers(req, res) {
    var userId = req.params.userId;

    UserFollowModel.getAllFollowersForUser(userId).then(function(followers) {
        return res.send(followers);
    });
}

function isUserFollowingUser(req, res) {
    var followingUserId = req.params.followingUserId;
    var followedUserId = req.params.followedUserId;

    UserFollowModel.getFollowBetweenUserAndUser(followingUserId, followedUserId).then(function(follow) {
        if (follow) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    });
}

function getLikedRecipesForUser(req, res) {
    var userId = req.params.userId;

    UserModel.getLikedRecipesForUser(userId).then(function(recipes) {
        return res.send(recipes);
    });
}

function getSharedRecipesForUser(req, res) {
    var userId = req.params.userId;

    UserModel.getSharedRecipesForUser(userId).then(function(recipes) {
        return res.send(recipes);
    });
}