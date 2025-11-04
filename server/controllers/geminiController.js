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

// IMAGE GENERATION
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

  let retries = 3;

  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${GEMINI_API_KEY}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const parts = response.data?.candidates?.[0]?.content?.parts || [];
      return res.json({ parts });
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      console.error('Gemini Image API Error:', status, data || error.message);

      // Retry only for rate-limit errors
      if (status === 429 && retries > 1) {
        console.warn(`Rate limit hit. Retrying in 10 seconds... (${retries - 1} retries left)`);
        await delay(10000);
        retries--;
        continue;
      }

      if (status === 429) {
        return res.status(429).json({
          error: 'Rate limit or quota exceeded. Please try again later.',
        });
      }

      return res.status(500).json({
        error: 'Failed to generate image.',
        details: data?.error?.message || error.message,
      });
    }
  }
};
