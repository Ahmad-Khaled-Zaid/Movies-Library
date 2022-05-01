"use strict";

// constructor to re-shape the data in the Trend page
function Movies(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
module.exports = Movies;
