'use strict';

// constructor to re-shape the data in the home page
function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

module.exports = Movie;
