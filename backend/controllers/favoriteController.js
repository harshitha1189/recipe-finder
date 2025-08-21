const Favorite = require('../models/Favourite')

// Add recipe to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { recipeId, title, image, cuisine, mealType } = req.body
    const userId = req.user.id

    // Prevent duplicate favorites
    const existing = await Favorite.findOne({ userId, recipeId })
    if (existing) {
      return res.status(400).json({ success: false, message: 'Recipe already in favorites' })
    }

    const favorite = new Favorite({ userId, recipeId, title, image, cuisine, mealType })
    await favorite.save()

    res.status(201).json({ success: true, message: 'Recipe added to favorites', favorite })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// Get all favorites of logged-in user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).lean()
    res.json({ success: true, favorites })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// Filter favorites by cuisine or meal type
exports.filterFavorites = async (req, res) => {
  try {
    const { cuisine, mealType } = req.query
    let filter = { userId: req.user.id }

    if (cuisine) filter.cuisine = cuisine
    if (mealType) filter.mealType = mealType

    const favorites = await Favorite.find(filter).lean()
    res.json({ success: true, favorites })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// Delete a favorite
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Favorite.findOneAndDelete({ _id: id, userId: req.user.id })

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Favorite not found' })
    }

    res.json({ success: true, message: 'Favorite deleted' })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}
