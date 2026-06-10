const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { ingredient1, ingredient2, ingredient3 } = req.body;

    if (!ingredient1 || !ingredient2 || !ingredient3) {
      return res.status(400).json({ error: 'All ingredients are required' });
    }

    const prompt = `Generate a recipe using: ${ingredient1}, ${ingredient2}, ${ingredient3}\n\nProvide: 1. Recipe Name, 2. Ingredients, 3. Steps`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);

    const data = await response.json();
    const recipe = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No recipe generated.';

    res.json({ recipe });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
