// DEPENDENCIES
const express = require("express");
const router = express.Router();

const tripsCtrl = require("../controllers/trips");

// ROUTES
// Routes begin at http://localhost:4000/trips

// TRIPS INDEX (GET) - /
router.get("/", tripsCtrl.index);

// TRIPS CREATE (POST) - /
router.post("/", tripsCtrl.create);

// TRIPS SHOW (GET) - /:id
router.get("/:id", tripsCtrl.show);

module.exports = router;
