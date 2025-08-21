const axios = require('axios')
const Favorite = require('../models/favorite')

// @desc Search recipes from Spoonacular
exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query,
        apiKey: process.env.SPOONACULAR_KEY,
        addRecipeInformation: true,
        number: 10
      }
    })
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes', error: err.message })
  }
}

// @desc Save recipe to favorites
exports.saveFavorite = async (req, res) => {
  try {
    const { recipeId, title, image, cuisine, mealType } = req.body
    const favorite = await Favorite.create({
      userId: req.user.id,
      recipeId,
      title,
      image,
      cuisine,
      mealType,
    })
    res.json(favorite)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc Get user favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id })
    res.json(favorites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
