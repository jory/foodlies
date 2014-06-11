'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
  var dishSchema = new mongoose.Schema({
    name: String,
    description: String
  });

  var mealSchema = new mongoose.Schema({
    name: String,
    date: mongoose.Schema.Types.Date,
    dishes: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: 'Dish' 
    }],
    location: String
  });

  var userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    meals: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Meal'
    }]
  });

  var Dish = mongoose.model('Dish', dishSchema);
  var Meal = mongoose.model('Meal', mealSchema);
  var User = mongoose.model('User', userSchema);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({ usernameField: 'name' }, function(name, done) {
    User.findOne({ name: name }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  }));

  mongoose.connect('localhost');
}
