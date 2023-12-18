// DEPENDENCIES
const express = require("express");
const router = express.Router();

// ROUTES
// Routes begin at http://localhost:4000/trips

// TRIPS INDEX (GET) - /
router.get("/", async (req, res) => {
  res.status(200).json({ message: "trips index route" });
});

// TRIPS CREATE (POST) - /
router.post("/", async (req, res) => {
  res.status(200).json({ message: "trips create route" });
});

// TRIPS SHOW (GET) - /:id
router.get("/:id", async (req, res) => {
  res.status(200).json({ message: "trips show route", id: req.params.id });
});

module.exports = router;
