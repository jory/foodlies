'use strict';

var mongoose = require('mongoose');

module.exports = function(app) {
  var dishSchema = new mongoose.Schema({
    name: String,
    description: String
  });

  var mealSchema = new mongoose.Schema({
    name: String,
    // date: mongoose.Schema.Types.Date,
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

  mongoose.connect('localhost');

  return {
    Dish: Dish,
    Meal: Meal,
    User: User
  };
};
