import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../estilos/PersonasDetails.css";
import Navegador from "./NavBTSP";

const PersonasDetails = () => {
  const { name } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=0023db00b52250d5bed5debec71d21fb&query=${name}`);
        if (response.data.results.length > 0) {
          const personId = response.data.results[0].id;
          const personDetails = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=0023db00b52250d5bed5debec71d21fb`);
          setPerson(personDetails.data);

          const movieCredits = await axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=0023db00b52250d5bed5debec71d21fb`);
          setMovies(movieCredits.data.cast.slice(0, 5));
        } else {
          console.error("No results found for person:", name);
        }
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [name]);

  if (!person) {
    return <div>Loading...</div>;
  }

  const firstParagraph = person.biography.split('\n').find(paragraph => paragraph.trim() !== "");

  const elementosMenu2 = [
    { url: "/LayoutCatalogo", texto: "Home" },
    { url: "/PelisGrid", texto: "Movies" },
    { url: "/Favoritos", texto: "Lists" },
  ];

  return (
    <>
      <Navegador items={elementosMenu2} />
      <div className="cuerpoPersona">
        <div className="cartaPersona">
          <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} className="imagenPersona" />
          <div className="detalles">
            <div className="contenido">
              <h2 className="tituloPersona">{person.name}</h2>
              <p className="biografia">{firstParagraph}</p>
              <div className="InfoAdicional">
                <div className="infoPersona">
                  <strong>Born:</strong> {person.birthday}
                </div>
                <div className="infoPersona">
                  <strong>Place of Birth:</strong> {person.place_of_birth}
                </div>
                {person.deathday && (
                  <div className="infoPersona">
                    <strong>Died:</strong> {person.deathday}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="peliculas">
          <h3 className="tituloApariciones">Featured Movies</h3>
          <ul className="listaPeliculas">
            {movies.map(movie => (
              <li key={movie.id} className="pelicula">
                <div className="img-grid">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="imagenPelicula"
                  />
                </div>
                <p className="tituloPelicula">{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PersonasDetails;
