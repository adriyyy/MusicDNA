import { useState, useEffect } from "react";
import axios from "axios";
import MusicInput from "../components/MusicInput";
import SongGrid from "../components/SongGrid";
import { toast } from "react-toastify";

const Music = () => {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("search");
  const [detectedMood, setDetectedMood] = useState(null);

  const fetchSearchResults = async () => {
    const token = localStorage.getItem("token");
    if (!query.trim() || !token) return;

    setLoading(true);
    try {
      const response = await axios.get("/api/music/search", {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSongs(response.data || []);
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      toast.error("Căutare eșuată. Încearcă din nou!");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoodRecommendations = async () => {
    const moodToEng = {
      fericit: "happy",
      stresat: "stressed",
      trist: "sad",
      energic: "energetic",
      calm: "calm",
      romantic: "romantic",
      relaxant: "relaxing",
      furios: "angry",
      motivant: "uplifting",
    };

    const token = localStorage.getItem("token");
    if (!mood.trim() || !token) return;

    const moodForApi = moodToEng[mood.toLowerCase()] || mood;

    setLoading(true);
    setSongs([]);
    try {
      const response = await axios.get("/api/music/recommend", {
        params: { mood: moodForApi },
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000,
      });
      if (response.data.tracks?.length > 0) {
        setSongs(response.data.tracks);
        setDetectedMood(response.data.moodDetails.classifiedAs || mood);
      }
    } catch (error) {
      console.error(
        "Eroare la recomandarea de muzică pe bază de dispoziție:",
        error.response?.data || error.message,
      );
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (song, moodLabel = null) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Not logged in");

    try {
      await axios.post(
        "/api/usermusic/liked",
        {
          songId: song.id || "",
          name: song.name || "",
          artist: song.artists?.[0]?.name || "Unknown",
          moodLabel: mode === "mood" ? detectedMood : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setLikedSongs((prev) => [...prev, song.id]);
    } catch (err) {
      console.error(
        "Eroare în aprecierea melodiei:",
        err.response?.data || err,
      );
    }
  };

  const handleSearch = () => {
    mode === "search" ? fetchSearchResults() : fetchMoodRecommendations();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (mode === "search") {
          fetchSearchResults();
        } else {
          fetchMoodRecommendations();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, query, mood]);

  useEffect(() => {
    setSongs([]);
  }, [mode]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎵 Descoperă-ți ADN-ul Muzical
      </h1>

      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setMode("search")}
          className={`px-4 py-2 rounded ${
            mode === "search" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Caută Melodii
        </button>

        <button
          onClick={() => setMode("mood")}
          className={`px-4 py-2 rounded ${
            mode === "mood" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Recomandări pe Bază de Dispoziție
        </button>
      </div>

      <MusicInput
        mode={mode}
        query={query}
        mood={mood}
        setQuery={setQuery}
        setMood={setMood}
        loading={loading}
        onSearch={handleSearch}
      />

      <SongGrid
        songs={songs}
        likedSongs={likedSongs}
        handleLike={handleLike}
        mode={mode}
        mood={mood}
      />
    </div>
  );
};

export default Music;
