getAllMovies = (req, res) => {
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
};
module.exports = getAllMovies;
