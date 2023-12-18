// DEPENDENCIES
require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));