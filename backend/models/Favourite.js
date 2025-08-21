const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipeId: String,
  title: String,
  image: String,
  cuisine: String,
  mealType: String
})

module.exports = mongoose.model('Favorite', favoriteSchema)
