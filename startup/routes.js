// const genres = require("./routes/genres");
const express = require('express');
const guests = require("../routes/guests");
// const movies = require("./routes/movies");
const auth = require("../routes/auth");
const users = require("../routes/users");
const error = require('../middleware/error')

module.exports = function (app) {
  app.use(express.json());
  // app.use("/api/genres", genres);
  app.use("/api/guests", guests);
  // app.use("/api/movies", movies);
  // app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
}