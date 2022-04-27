const express = require("express");
const app = express();
const data = require("./data.json");
function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}
app.get("/", (req, res) => {
  let object = new Movie(data.title, data.poster_path, data.overview);
  console.log(object);
  res.json(object);
});
app.get("/favorite", (req, res) => {
  res.send("Welcome to Favorite Page");
});
app.use((request, response, next) => {
  response.status(404).json(handleError404());
});
app.use(function (error, req, res, next) {
  res.status(500).json(handleError500());
});

function handleError404() {
  return {
    status: 404,
    responseText: "Sorry, something went wrong",
  };
}
function handleError500() {
  return {
    status: 500,
    responseText: "Sorry, something went wrong",
  };
}

app.listen(3004, () => console.log("server is running"));
