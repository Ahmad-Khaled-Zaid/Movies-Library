"use strict";

const axios = require("axios");
require("dotenv").config();
const Movies = require("../models/Movies.model");

//function to show the Trend Movies at /trending end-point
const Trends = (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    )
    .then((result) => {
      console.log(result.data.results);
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
module.exports = Trends;
