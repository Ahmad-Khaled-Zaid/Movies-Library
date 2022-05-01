"use strict";
const axios = require("axios");
require("dotenv").config();
const get_images = (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/238/images?api_key=${process.env.API_KEY}`
    )
    .then((Data) => {
      res.send(Data.data);
    })
    .catch((error) => {
      res.send({ responseText: "Sorry, something went wrong" });
    });
};
module.exports = get_images;
