const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const Trends = require("./controllers/Trends.controller");
const search = require("./controllers/search.controller");
const get_images = require("./controllers/get_images.controller");
const TV_latest = require("./controllers/TV_latest.controller");
const favoriteMsg = require("./controllers/favorite.controller");
const HomeMovie = require("./controllers/HomeMovie.controller");

//Home end point
app.get("/", HomeMovie);

// end point to show the trending movies
app.get("/trending", Trends);

// end point to search by keyword
app.get("/search", search);

// end points to get images
app.get("/images", get_images);

// end point to show latest TV shows
app.get("/TV", TV_latest);

// end point to show welcome message
app.get("/favorite", favoriteMsg);

// handle error 404
app.use((request, response, next) => {
  response.status(404).json(handleError404());
});

// handle error 500
app.use(function (error, req, res, next) {
  res.status(500).json(handleError500());
});

// function print 404 message
function handleError404() {
  return {
    status: 404,
    responseText: "Sorry, something went wrong",
  };
}

// function to print 500 Error
function handleError500() {
  return {
    status: 500,
    responseText: "Sorry, something went wrong",
  };
}

app.listen(process.env.PORT, () => console.log("server is running"));
