// DEPENDENCIES
require("dotenv").config();
require("./config/db.connection.js");
const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const tripsRouter = require("./routes/trips.js");
const activitiesRouter = require("./routes/activities.js");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse json bodies

app.use(cors());
app.use(morgan("dev"));

// all requests for endpoints beginning with /trips
app.use("/trips", tripsRouter);
app.use("/trips", activitiesRouter);

// ROUTES
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
