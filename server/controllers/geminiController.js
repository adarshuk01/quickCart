const axios = require('axios');
const { GEMINI_API_KEY, GEMINI_API_URL } = require('../config/geminiConfig');

// Helper: wait before retry
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// TEXT GENERATION
exports.generateContent = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
    });

    const content =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ response: content });
  } catch (error) {
    console.error('Gemini Text API Error:', error.response?.status, error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit or quota exceeded. Please try again in a few seconds.',
      });
    }

    res.status(500).json({ error: 'Failed to fetch Gemini response.' });
  }
};

// IMAGE GENERATION (CORRECT - USING IMAGEN 3)
exports.generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const model = "imagen-3.0-generate-001"; // ✅ Imagen 3 (image model)
  const api = "generateImage";             // ✅ correct API for images

  const payload = {
    prompt,
    // optional:
    // negativePrompt: "low quality"
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    const images = response.data?.images;

    if (!images) {
      return res.status(500).json({ error: "No images returned from API." });
    }

    // images[0].imageBytes is base64 PNG
    return res.json({
      image: images[0].imageBytes
    });

  } catch (error) {
    console.error("Image API Error:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to generate image.",
      details: error.response?.data || error.message,
    });
  }
};
