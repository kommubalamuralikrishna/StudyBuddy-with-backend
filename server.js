// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// ----- Middleware -----
app.use(cors());
app.use(express.json());

// Serve static files (your HTML, CSS, JS) from this folder
app.use(express.static(__dirname));

// ----- In-memory topic → URL mapping -----
const links = {
  dsa: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
  dbms: "https://www.geeksforgeeks.org/dbms/dbms/",
  oops: "https://www.w3schools.com/cpp/cpp_oop.asp",
  // you can add more here later
};

// ----- Routes -----

// Simple health check (optional)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "StudyBuddy backend is running" });
});

// GET /api/links/:topic  -> return URL if exists
app.get("/api/links/:topic", (req, res) => {
  const topic = (req.params.topic || "").toLowerCase();

  if (links[topic]) {
    return res.json({ found: true, url: links[topic] });
  }

  res.json({ found: false });
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`✅ StudyBuddy server running at http://localhost:${PORT}`);
  console.log(`👉 Open http://localhost:${PORT}/index.html (or your html file name)`);
});
