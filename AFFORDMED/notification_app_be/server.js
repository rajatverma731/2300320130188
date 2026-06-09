require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const logger  = require("../logging_middleware/logger");

const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger);                       // request logger

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", notificationRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[notification_app_be] Server running on http://localhost:${PORT}`);
});
