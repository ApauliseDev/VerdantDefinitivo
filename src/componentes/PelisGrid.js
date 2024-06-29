import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { DataContext } from './DataContext';
import Navegador from "./NavBTSP";
import "../estilos/pelisGrid.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  objectFit: "cover",
}));

const elementosMenu2 = [
  { url: "/LayoutCatalogo", texto: "Home" },
  { url: "/PelisGrid", texto: "Movies" },
  { url: "/Favoritos", texto: "Lists" },
];

function PelisGrid() {
  const location = useLocation();
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '0023db00b52250d5bed5debec71d21fb';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/w500';

  // Watchlist
  const { porver, setPorver } = useContext(DataContext);

  const addToWatchList = async (movie) => {
    try {
      // Obtener el userId desde el contexto o el almacenamiento local
      const user = JSON.parse(localStorage.getItem('account')); // Asegúrate de que el objeto 'account' está en el localStorage
      if (!user || !user.id) {
        throw new Error('User is not logged in or userId is missing');
      }
      const userId = user.id;
      console.log( "Bolivia:" +userId)
  
      // Obtener el listId
      const listResponse = await axios.get('http://localhost:3001/api/lists/getListId', {
        params: {
          userId: userId,
          name: 'Por ver', // El nombre de la lista
        }
      });
  
      const listId = listResponse.data.listId;
      console.log(listId + "Anashe")  
      // Agregar la película a la lista
      const response = await axios.post('http://localhost:3001/api/movies/addToList', {
        listId,
        tmdbId: movie.id,
        title: movie.title,
      });
  
      if (response.status === 201) {
        alert("Great choice! :)");
        setPorver([...porver, movie]); // Actualiza el estado local
      } else {
        alert("This movie is already added");
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      alert('Failed to add movie');
    }
  };
  // Filtrar por género
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [activeGenres, setActiveGenres] = useState([]);

  const fetchMoviesByGenres = async () => {
    try {
      const { data: { results } } = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: selectedGenres.join(','),
        },
      });
      // Asegurarte de que media_type sea "movie"
      const moviesWithMediaType = results.map(movie => ({ ...movie, media_type: "movie" }));
      setMovielist(moviesWithMediaType);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMoviesByGenres();
  }, [selectedGenres]);

  useEffect(() => {
    if (location.state?.genreID) {
      const genreID = location.state.genreID;
      setSelectedGenres([genreID]);
      setActiveGenres([genreID]);
    }
  }, [location.state]);

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
      setActiveGenres(activeGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
      setActiveGenres([...activeGenres, genreId]);
    }
  };

  // Variables de estado 
  const [movielist, setMovielist] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [page, setPage] = useState(1);

  const fetchTrendingMovies = async () => {
    try {
      const { data: { results } } = await axios.get(`${API_URL}/trending/movie/week`, {
        params: {
          api_key: API_KEY,
          page: page,
        },
      });

      const filteredResults = results.filter(result => result.poster_path !== null);
      setMovielist(filteredResults);
      setMovie(filteredResults[0]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchSearchResults = async (searchKey) => {
    try {
      const { data: { results } } = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page,
        },
      });

      const filteredResults = results.filter(result =>
        (result.media_type === "movie" && result.poster_path !== null) ||
        (result.media_type === "person" && result.profile_path !== null)
      );
      setMovielist(filteredResults);
      setMovie(filteredResults[0]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const loadMoreMovies = () => {
    window.scrollTo(0, 0);
    setPage(page + 1);
  };

  const loadLessMovies = () => {
    if (page !== 1) {
      window.scrollTo(0, 0);
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (searchKey) {
      fetchSearchResults(searchKey);
    } else {
      fetchTrendingMovies();
    }
  }, [page, searchKey]);

  const searchMovies = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSearchResults(searchKey);
  };

  return (
    <>
      <Navegador items={elementosMenu2} />

      <div className="contenedor-titulo-peliculas">
        <h2 style={{ fontSize: "36px" }}>Movies</h2>
        <div>
          <button
            id="BotonesGeneros"
            onClick={() => { toggleGenre(12) }}
            className={activeGenres.includes(12) ? 'active' : ''}
          >
            Adventure
          </button>
          <button
            id="BotonesGeneros"
            onClick={() => { toggleGenre(10752) }}
            className={activeGenres.includes(10752) ? 'active' : ''}
          >
            War
          </button>
          <button
            id="BotonesGeneros"
            onClick={() => { toggleGenre(35) }}
            className={activeGenres.includes(35) ? 'active' : ''}
          >
            Comedy
          </button>
          <button
            id="BotonesGeneros"
            onClick={() => { toggleGenre(27) }}
            className={activeGenres.includes(27) ? 'active' : ''}
          >
            Horror
          </button>
          <button
            id="BotonesGeneros"
            onClick={() => { toggleGenre(10749) }}
            className={activeGenres.includes(10749) ? 'active' : ''}
          >
            Romance
          </button>
        </div>
      </div>
      <form style={{ display: "flex", justifyContent: "center", margin: 15 }} onSubmit={searchMovies}>
        <input
          className="input-busqueda"
          type="text"
          placeholder="Search a movie..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </form>

      <Box sx={{ flexGrow: 1, paddingLeft: 6, paddingRight: 6 }}>
        <div className="load-buttons" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <button onClick={loadLessMovies}>{<ArrowBackIosIcon />} Previous</button>
          <button onClick={loadMoreMovies}>Next {<ArrowForwardIosIcon />}</button>
        </div>

        <Grid container spacing={0.1}>
          {movielist.map((item) => (
            <Grid key={item.id} xs={6} md={4} lg={3} xl={2.4}>
              <Item className="img-grid">
                {item.media_type === "person" ? (
                  <Link to={`/PersonDetails/${item.name}`} state={{ personDetails: item }}>
                    <div className="overlay-container">
                      <img
                        src={`${URL_IMAGE + item.profile_path}`}
                        alt={item.name}
                        style={{ borderRadius: "16px", width: "100%", height: "100%" }}
                      />
                      <div className="overlay-text">{item.name}</div>
                    </div>
                  </Link>
                ) : (
                  <Link to={`/LayoutPeliculas/${item.original_title}`} state={{ movieDetails: item }}>
                    <img
                      src={`${URL_IMAGE + item.poster_path}`}
                      alt={item.title}
                      style={{ borderRadius: "16px", width: "100%", height: "100%" }}
                    />
                  </Link>
                )}
                {item.media_type === "movie" && (
                  <button
                    id="boton-poster"
                    onClick={() => { addToWatchList(item) }}
                  >{<PlaylistAddIcon />}</button>
                )}
              </Item>
            </Grid>
          ))}
        </Grid>

        <div className="load-buttons" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <button onClick={loadLessMovies}>{<ArrowBackIosIcon />} Previous</button>
          <button onClick={loadMoreMovies}>Next {<ArrowForwardIosIcon />}</button>
        </div>
      </Box>
    </>
  );
}

export default PelisGrid;
