var app = require('../../express');

var UserModel = require('../models/user/user.model.server.js');
var UserFollowModel = require('../models/user/userfollow.model.server.js');

var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var auth = authorized;
var login = loginFn;

app.post('/api/login', login);
app.post('/api/logout', logout);
app.get('/api/getLoggedInUser', getLoggedInUser);
app.post('/api/validatepw', validatePassword);
app.put('/api/updatePassword', updatePassword);

app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);

app.post('/api/user/:userId/follow/:followedUserId', createFollowFromUserToUser);
app.post('/api/user/:userId/like/:recipeId', likeRecipeForUser);
app.post('/api/user/:userId/share/:recipeId', shareRecipeForUser);

app.get('/api/user/:userId/following', getUsersFollowing);
app.get('/api/user/:userId/followers', getFollowers);
app.get('/api/user/checkFollow/:followingUserId/:followedUserId', isUserFollowingUser);
app.get('/api/user/:userId/likedRecipes', getLikedRecipesForUser);
app.get('/api/user/:userId/sharedRecipes', getSharedRecipesForUser);

function localStrategy(username, password, done) {
    UserModel.findUserByUsername(username, password)
        .then(
            function(user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                return done(null, false);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            });
}

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(id, done) {
    UserModel.findUserById(id)
        .then(
            function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

function authorized(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function loginFn(req, res) {
    passport.authenticate('local', function(err, user, info) {
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