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

// IMAGE GENERATION (FIXED)
exports.generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const model = "gemini-1.5-flash";  // ✅ Supported image generation model
  const api = "generateContent";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      response_mime_type: "image/png",  // ✅ MUST for image output
    },
  };

  let retries = 3;

  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${GEMINI_API_KEY}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract image data
      const parts = response.data?.candidates?.[0]?.content?.parts;

      if (!parts) {
        return res.status(500).json({ error: "No image data returned." });
      }

      return res.json({ parts }); // base64 png output
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      console.error("Gemini Image API Error:", status, data || error.message);

      // Retry only on rate limit
      if (status === 429 && retries > 1) {
        await delay(8000); // 8 sec backoff
        retries--;
        continue;
      }

      return res.status(status || 500).json({
        error: "Failed to generate image.",
        details: data?.error?.message || error.message,
      });
    }
  }
};

