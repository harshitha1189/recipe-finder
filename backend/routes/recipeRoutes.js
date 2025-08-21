// backend/routes/recipeRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // example: /api/recipes/search?q=pasta
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: { query, apiKey: process.env.SPOONACULAR_KEY }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});
router.post('/save', async (req, res) => {
  try {
    const { recipeId, title, image } = req.body;
    // later you’ll store it in MongoDB with a Recipe model
    res.json({ message: 'Recipe saved', recipeId, title, image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving recipe' });
  }
});


module.exports = router;
