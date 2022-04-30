const { default: axios } = require("axios");
const express = require("express");
const { handle } = require("express/lib/application");
const app = express();
const data = require("./Movie_Data/data.json");
require("dotenv").config();

// constructor to re-shape the data in the home page
function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

// constructor to re-shape the data in the Trend page
function Movies(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
function TV(name, adult, lastShow, Episodes) {
  this.name = name;
  this.adult = adult;
  this.lastShow = lastShow;
  this.Episodes = Episodes;
}

//Home end point
app.get("/", (req, res) => {
  let object = new Movie(data.title, data.poster_path, data.overview);
  res.json(object);
});

// Trend end point
app.get("/trending", (req, res) => {
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
});

// end point to search for specific movie
app.get("/search", (req, res) => {
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
});

// end points to get images
app.get("/images", (req, res) => {
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
});

// end point to show latest TV shows
app.get("/TV", (req, res) => {
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
});
// app.get("/searchTV", (req, res) => {
//   tvName = req.query.Name;
//   console.log(req.query);
//   axios.get(
//     `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${tvName}`
//   );
// });

// end point to favorite page
app.get("/favorite", (req, res) => {
  res.send("Welcome to Favorite Page");
});

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
