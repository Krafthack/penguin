var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./model/User');
var AccessToken = require('./model/access-token');
var express = require('express');

var TwitterAuthHandler = function(token, tokenSecret, profile, done) {
  AccessToken.findOrCreate({ token: token, secret: tokenSecret  }, function(err, accessToken) {
    if (err) { return done(err); }

    User.findById(accessToken.user, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user == null) {
        var username = profile.username;
        return createUser(username, accessToken, done);
      }
      return done(null, user);
    });
  });
}

var updateClientId = function(user, accessToken, done) {
  accessToken.user_id = user._id;
  return accessToken.save(function(err) {
    if (err) return done(err);
    return  done(null, user)
  });
}

var createUser = function(username, accessToken, done) {
  var user = new User({ username: username })
  return user.save(function(err, user) {
    if (err) return done(err);
    return updateClientId(user, accessToken, done);
  });
}

var init = function(config) {

  var app = express();
  app.use(passport.initialize());

  var consumer = process.env.TWITTER_CONSUMER_KEY;
  var secret = process.env.TWITTER_SECRET_KEY;

  passport.use(new TwitterStrategy({
      consumerKey: consumer,
      consumerSecret: secret,
      callbackURL: config.callback
    },
    TwitterAuthHandler
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));

  return app;

}


module.exports = init;
