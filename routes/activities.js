// DEPENDENCIES
const express = require("express");
const router = express.Router();
const activitiesCtrl = require('../controllers/activities')

// ROUTES
// Routes begin at http://localhost:4000/trips

// ACTIVITY SEARCH (GET) - /:id/activities
router.get("/:id/activities/search", activitiesCtrl.search)

// ACTIVITY SHOW (GET) - /:id/activites/:id
// router.get("/:id/activities/:id", async (req, res) => {
//   res.status(200).json({ message: "activity show route", id: req.params.id });
// });

module.exports = router;
