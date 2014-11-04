var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var express = require('express');

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
    function(token, tokenSecret, profile, done) {
      done(null, { user: 'user' });;
    }
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
