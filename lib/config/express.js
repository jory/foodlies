'use strict';

var express = require('express'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app, User) {
  var env = app.get('env');

  if ('development' === env) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  }

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  }

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  app.use(cookieParser());
  app.use(session({ secret: 'keyboard cat' }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    if (req.user) {
      res.cookie('user', JSON.stringify(req.user));
    }
    next();
  });

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.send(200);
  });

  app.post('/api/signup', function(req, res, next) {
    var user = new User({
      username: req.body.username,
    });
    user.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });

  // Error handler - has to be last
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
};
