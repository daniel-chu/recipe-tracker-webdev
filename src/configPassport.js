module.exports = function(passport, LocalStrategy, FacebookStrategy, bcrypt, UserModel) {

    var facebookConfig = {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
    }

    var googleConfig = {

    }

    passport.use(new LocalStrategy(localStrategy));
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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

    // function facebookStrategy(accessToken, refreshToken, profile, callback) {
    //     UserModel.findUserBy
    // }

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


}