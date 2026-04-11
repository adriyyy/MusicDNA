const express = require("express");
const router = express.Router();
const {
  likeSong,
  getPersonalizedSongs,
  getLikedSongs,
  fetchtracks,
  deleteLikedSong,
} = require("../controllers/personalizationController.js");
const authMiddleware = require("../middleware/auth");
router.post("/liked", authMiddleware, likeSong);
router.delete("/liked/:id", authMiddleware, deleteLikedSong);
router.get("/userliked", authMiddleware, getLikedSongs);
router.get("/personalmusic", authMiddleware, getPersonalizedSongs);
router.get("/fetchtrack", authMiddleware, fetchtracks);
module.exports = router;
