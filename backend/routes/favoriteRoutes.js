const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

// Add a recipe to favorites (requires login)
router.post('/', protect, addFavorite);

// Get all favorite recipes for the logged-in user
router.get('/', protect, getFavorites);

module.exports = router;
