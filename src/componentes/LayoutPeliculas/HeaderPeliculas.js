import React from "react";
import "../../estilos/headerPeliculas.css";
//import RatingStars from "./RatingStars";
import ElencoImagenes from "./ElencoImagenes"
import Generos from "./Generos";


function HeaderPeliculas(props) {
  
  return (
    <header id="layout-header">
      <div className="header-banner">
        <img src={`https://image.tmdb.org/t/p/original${props.wallpaper}`} alt={props.title} />
        <div className="header-shadow"> </div>
      </div>
      <section className="header-content-box">
        <div className="cartelera-img">
          <img src={`https://image.tmdb.org/t/p/w500${props.poster}`} alt={props.title} />
          <div className="rating">
            <p>Rating: {props.rating}/10</p>
          </div>
        </div>
        <article className="movie-info">
          <h2 style={{margin: "20px"}}> {props.title} </h2>
          <Generos generosId={props.id}/>
          <h6> Overview</h6>
          <p>{props.sinopsis} </p>

          <ElencoImagenes movieId={props.id} />
          
        </article>
      </section>
    </header>
  );
}

export default HeaderPeliculas;
