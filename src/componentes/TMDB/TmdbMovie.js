import React, { useEffect, useState } from "react";

const TmdbMovie = () => {
  const [movielist, setMovielist] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=0023db00b52250d5bed5debec71d21fb"
    )
      .then((res) => res.json())
      .then((json) => setMovielist(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movielist);

  return (
    <div>
      {movielist.map((movie) => (
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
      ))}
    </div>
  );
};

export default TmdbMovie;
