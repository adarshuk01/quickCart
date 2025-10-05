const axios = require('axios');
const { GEMINI_API_KEY, GEMINI_API_URL } = require('../config/geminiConfig');

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

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ response: content });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Gemini response.' });
  }
};


exports.generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const model = 'gemini-2.0-flash-preview-image-generation';
  const api = 'generateContent';

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      responseMimeType: 'text/plain',
    },
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${GEMINI_API_KEY}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const parts = response.data?.candidates?.[0]?.content?.parts || [];
    res.json({ parts });
  } catch (error) {
    console.error('Gemini Image API Error:', error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    res.status(500).json({ error: 'Failed to generate image.' });
  }
};
