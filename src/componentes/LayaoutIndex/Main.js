import React, { useEffect, useState } from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from 'axios';
import "../../estilos/main.css";

function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '0023db00b52250d5bed5debec71d21fb',
          },
        });
        setMovies(response.data.results.slice(0, 6)); // Obtener solo las primeras 6 películas
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="maincontenedor">
      <div className="contendorLista"> 
        <ul className="listamain">
          {movies.map((movie) => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </li>
          ))}
        </ul>
        <h2 className="intermedio"> In verdant...</h2>
      </div>

      <div className="card-container">
        <div className="card">
          <GroupsIcon fontSize="large" />
          <p>Stay up to date with what the community thinks about any series or movie you can imagine.</p>
        </div>
        <div className="card">
          <FavoriteIcon fontSize="large" />
          <p>Show your love to the cast through your reviews and ratings.</p>
        </div>
        <div className="card">
          <SpeakerNotesIcon fontSize="large" />
          <p>Interact and share your opinion with other members of the community</p>
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <StarIcon fontSize="large" />
          <p>Interact and share your opinion with other members of the community</p>
        </div>
        <div className="card">
          <CalendarMonthIcon fontSize="large" />
          <p>Don't miss the latest releases and be the first to let us know your opinion</p>
        </div>
        <div className="card">
          <PlaylistAddIcon fontSize="large" />
          <p>Create a list to add all the movies and series you plan to watch</p>
        </div>
      </div>
      <div className="carts" ></div>
    </div>
  );
}

export default Main;
