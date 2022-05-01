"use strict";
const Movie = require("../models/Movie.model");
const data = require("../Movie_Data/data.json");

const HomeMovie = (req, res) => {
  let object = new Movie(data.title, data.poster_path, data.overview);
  res.json(object);
};
module.exports = HomeMovie;
