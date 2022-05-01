"use strict";

const axios = require("axios");
require("dotenv").config();
const Movies = require("../models/Movies.model");
const search = (req, res) => {
  let name = req.query.name;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${name}`
    )
    .then((result) => {
      let data = result.data.results;

      let filteredData = data.map((element) => {
        return new Movies(
          element.id,
          element.title,
          element.release_date,
          element.poster_path,
          element.overview
        );
      });
      res.json(filteredData);
    })
    .catch((error) => {
      res.send({ responseText: "Sorry, something went wrong" });
    });
};
module.exports = search;
