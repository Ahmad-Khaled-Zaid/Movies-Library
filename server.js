"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// app.use(handleError);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Trends = require("./controllers/Trends.controller");
const search = require("./controllers/search.controller");
const get_images = require("./controllers/get_images.controller");
const TV_latest = require("./controllers/TV_latest.controller");
const favoriteMsg = require("./controllers/favorite.controller");
const HomeMovie = require("./controllers/HomeMovie.controller");
let url = process.env.URL;

const { Client } = require("pg");
const client = new Client(url);

function addMovie(req, res) {
  console.log(req.body);
  res.send("movie had been successfully added to the database");
  let { movie_name, release_date, trailer_vedio } = req.body;
  let sql = `INSERT INTO movies(movie_name,release_date,trailer_vedio) VALUES($1, $2, $3) RETURNING *;`;
  let values = [movie_name, release_date, trailer_vedio];
  client
    .query(sql, values)
    .then((result) => {
      res.status(201).json(result.rows);
    })
    .catch((err) => {
      handleError(err, req, res);
    });
}
function handleError(error, req, res) {
  res.status(500).send(error);
}

function getHandler(req, res) {
  let sql = `SELECT * FROM movies ;`;
  client
    .query(sql)
    .then((result) => {
      console.log(result);
      res.json(result.rows);
    })
    .catch((err) => {
      handleError(err, req, res);
    });
}
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

// end point to add a movie to the database
app.post("/addMovie", addMovie);

// endpoint to get all the movies from the database
app.get("/getData", getHandler);

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
client.connect().then(() => {
  app.listen(process.env.PORT, () => console.log("server is running"));
});
