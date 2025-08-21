// backend/models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  recipeId: { type: Number, required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);
