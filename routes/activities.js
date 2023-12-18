// DEPENDENCIES
const express = require("express");
const router = express.Router();

// ROUTES
// Routes begin at http://localhost:4000/trips

// ACTIVITY SEARCH (GET) - /:id/activities
router.get("/:id/activities", async (req, res) => {
  res.status(200).json({ message: "activity search route", id: req.params.id });
});

// ACTIVITY SHOW (GET) - /:id/activites/:id
// router.get("/:id/activities/:id", async (req, res) => {
//   res.status(200).json({ message: "activity show route", id: req.params.id });
// });

module.exports = router;
