const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// ----- MySQL connection -----
const pool = mysql.createPool({
  host: "localhost",
  user: "root",                 // your MySQL user
  password: "balu123", // <<--- change this
  database: "studybuddy"
});

// ----- Middleware -----
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS) from this folder
app.use(express.static(__dirname));

// ----- Routes -----

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "StudyBuddy backend with MySQL is running" });
});

// GET /api/links/:topic  -> search topic in DB and return URL if exists
app.get("/api/links/:topic", async (req, res) => {
  try {
    const topic = (req.params.topic || "").toLowerCase();

    const [rows] = await pool.query(
      "SELECT url FROM links WHERE topic = ?",
      [topic]
    );

    if (rows.length > 0) {
      return res.json({ found: true, url: rows[0].url });
    }

    res.json({ found: false });
  } catch (err) {
    console.error("Error in GET /api/links/:topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/links  -> user can add new topic + url
app.post("/api/links", async (req, res) => {
  try {
    let { topic, url } = req.body;

    if (!topic || !url) {
      return res.status(400).json({ error: "topic and url are required" });
    }

    topic = topic.toLowerCase().trim();
    url = url.trim();

    await pool.query(
      "INSERT INTO links (topic, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = VALUES(url)",
      [topic, url]
    );

    res.status(201).json({ message: "Link saved successfully", topic, url });
  } catch (err) {
    console.error("Error in POST /api/links:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/links/:topic -> delete a topic from DB
app.delete("/api/links/:topic", async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();

    const [result] = await pool.query(
      "DELETE FROM links WHERE topic = ?",
      [topic]
    );

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "Topic not found" });
    }

    res.json({ success: true, message: "Link deleted successfully" });
  } catch (err) {
    console.error("Error in DELETE /api/links/:topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`✅ StudyBuddy server running at http://localhost:${PORT}`);
  console.log(`👉 Open http://localhost:${PORT}/index.html`);
});
