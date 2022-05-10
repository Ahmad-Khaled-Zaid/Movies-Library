
DROP TABLE IF EXISTS Movies;
CREATE TABLE IF NOT EXISTS Movies(
    id SERIAL PRIMARY KEY,
     movie_name VARCHAR(50),
    release_date date,
    trailer_vedio VARCHAR(50),
    comment VARCHAR(50)
)