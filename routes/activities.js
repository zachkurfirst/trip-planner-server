// DEPENDENCIES
const express = require("express");
const router = express.Router();
const activitiesCtrl = require('../controllers/activities')

// ROUTES
// Routes begin at http://localhost:4000/trips

// ACTIVITY SEARCH (GET) - /:id/activities
router.get("/:id/activities/search", activitiesCtrl.search)

module.exports = router;
