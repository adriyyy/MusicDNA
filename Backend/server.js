const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const recommendmusicRoutes = require("./routes/recommendMusicRoutes");
const personalizedmusicRoutes = require("./routes/personalizedMusicRoutes");

const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/music", recommendmusicRoutes);
app.use("/api/usermusic", personalizedmusicRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../Frontend/dist");
  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

async function checkDbConnection() {
  try {
    const count = await prisma.user.count();
    console.log(`MongoDB connected! User count: ${count}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

checkDbConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
