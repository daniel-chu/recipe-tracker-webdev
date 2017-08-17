module.exports = function(passport, LocalStrategy, FacebookStrategy, GoogleStrategy, bcrypt, UserModel) {

    var facebookConfig = {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'picture.type(large)', 'first_name', 'last_name', 'email']
    }

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    
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

    function facebookStrategy(accessToken, refreshToken, profile, done) {
        UserModel.findUserByFacebookId(profile.id).then(function(existingUser) {
            if (existingUser) {
                return done(null, existingUser);
            } else {
                var profileInfo = profile._json;
                return generateUsername(profileInfo.first_name, profileInfo.last_name, 1)
                    .then(function(generatedUsername) {
                        var newUserInfo = {
                            username: generatedUsername,
                            firstName: profileInfo.first_name,
                            lastName: profileInfo.last_name,
                            facebook: {
                                id: profileInfo.id,
                                token: accessToken
                            },
                            proPicUrl: profileInfo.picture.data.url
                        }

                        return UserModel.create(newUserInfo).then(function(newUser) {
                            return done(null, newUser);
                        });
                    });
            }
        });
    }

    function googleStrategy(accessToken, refreshToken, profile, done) {
        UserModel.findUserByGoogleId(profile.id).then(function(existingUser) {
            if (existingUser) {
                return done(null, existingUser);
            } else {
                var profileInfo = profile._json;
                var newUserInfo = {
                    username: parseGmailForUsername(profileInfo.emails[0].value),
                    firstName: profileInfo.name.givenName,
                    lastName: profileInfo.name.familyName,
                    google: {
                        id: profileInfo.id,
                        token: accessToken
                    },
                    proPicUrl: processGooglePictureUrl(profileInfo.image.url)
                }

                return UserModel.create(newUserInfo).then(function(newUser) {
                    return done(null, newUser);
                });
            }
        });
    }

    function generateUsername(firstName, lastName, iteration) {
        var attemptedUsername = firstName.toLowerCase() + '-' + lastName.toLowerCase() + iteration;
        return UserModel.findUserByUsername(attemptedUsername).then(function(existingUser) {
            if (existingUser) {
                return generateUsername(firstName, lastName, iteration + 1);
            } else {
                return attemptedUsername;
            }
        });
    }

    function parseGmailForUsername(email) {
        return email.split('@')[0];
    }

    function processGooglePictureUrl(url) {
        if (url.includes('?sz=50')) {
            return url.replace('?sz=50', '?sz=200');
        }
        return url.append('?sz=200');
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

}