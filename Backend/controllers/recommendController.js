const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");

dotenv.config();

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials in .env");
  }

  const tokenData = qs.stringify({ grant_type: "client_credentials" });

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    tokenData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data.access_token;
};

const searchSongs = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const token = await getAccessToken();

    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });

    return res.json(spotifyRes.data.tracks.items);
  } catch (error) {
    console.error("Spotify ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to search songs",
      details: error.response?.data || error.message,
    });
  }
};

const recommendByMood = async (req, res) => {
  const { mood } = req.query;

  if (!mood) {
    return res.status(400).json({ error: "Mood input is required" });
  }
  try {
    const hfResponse = await axios.post(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
      {
        inputs: mood,
        parameters: {
          candidate_labels: [
            "happy",
            "sad",
            "energetic",
            "calm",
            "romantic",
            "stressed",
            "relaxing",
            "angry",
            "uplifting",
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("HF RAW RESPONSE:", JSON.stringify(hfResponse.data, null, 2));

    if (!hfResponse.data) {
      throw new Error("No response from HuggingFace");
    }

    if (hfResponse.data.error) {
      throw new Error(`HF ERROR: ${hfResponse.data.error}`);
    }

    // 🔥 LUĂM PRIMELE 2 LABEL-URI
    const labels = hfResponse.data;

    const topLabels = labels.slice(0, 2).map((l) => l.label);

    const mainLabel = topLabels[0]; // pentru chart / salvare
    const searchQuery = topLabels.join(" "); // pentru Spotify

    console.log("TOP LABELS:", topLabels);

    const token = await getAccessToken();

    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: searchQuery, // 🔥 aici e schimbarea mare
        type: "track",
        limit: 10,
      },
    });

    return res.json({
      moodDetails: {
        userInput: mood,
        classifiedAs: mainLabel, // 🔥 IMPORTANT pentru chart
        alternatives: topLabels, // bonus info
      },
      tracks: spotifyRes.data.tracks.items,
    });
  } catch (error) {
    console.log("=== FULL ERROR ===");
    console.log(error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to get recommendations",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = {
  searchSongs,
  recommendByMood,
};
