"use strict";

//function to re-shape the data in the TV end point
function TV(name, adult, lastShow, Episodes) {
  this.name = name;
  this.adult = adult;
  this.lastShow = lastShow;
  this.Episodes = Episodes;
}

module.exports = TV;
