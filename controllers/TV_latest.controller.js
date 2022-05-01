"use strict";
const axios = require("axios");
require("dotenv").config();
const TV = require("../models/TV.model");
const TV_latest = (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/tv/latest?api_key=${process.env.API_KEY}`
    )
    .then((Data) => {
      console.log(Data.data.name);
      console.log(Data.data.adult);
      console.log(Data.data.last_episode_to_air.air_date);
      console.log(Data.data.last_episode_to_air.episode_number);
      let latest = new TV(
        Data.data.name,
        Data.data.adult,
        Data.data.last_episode_to_air.air_date,
        Data.data.last_episode_to_air.episode_number
      );
      res.json(latest);
    })
    .catch((error) => {
      res.send({ responseText: "Sorry, something went wrong" });
    });
};
module.exports = TV_latest;
