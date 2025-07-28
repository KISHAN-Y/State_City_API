const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ Enable CORS for mobile apps & browsers

const states = JSON.parse(fs.readFileSync("./data/states.json"));
const cities = JSON.parse(fs.readFileSync("./data/cities.json"));

app.get("/api/states", (req, res) => {
  res.json(states);
});

app.get("/api/cities", (req, res) => {
  const stateName = req.query.state?.toLowerCase();
  const state = states.find(s => s.name.toLowerCase() === stateName);

  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

  const result = cities.filter(c => c.state_id === state.id);
  res.json(result);
});

app.get("/", (req, res) => {
  res.send("✅ India States & Cities API is running.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
