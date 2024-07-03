import React, { useEffect, useState } from 'react'
import '../estilos/favoritos.css'
import Navegador from './NavBTSP'
import { styled } from "@mui/material/styles";
import CustomizedMenus from './CustomizedMenus'
import { Box, Grid } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import axios from 'axios'
import { useContext } from 'react'
import { DataContext } from './DataContext'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  objectFit: "cover",
}));


function Favoritos() {

  const elementosMenu = [
    { url: '/LayoutCatalogo', texto: 'Home' },
    { url: '/PelisGrid', texto: 'Movies' },
    { url: '/Favoritos', texto: 'Lists' }
  ]

  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/w500'


  const [envistas, setEnvistas] = useState(false)
  const [watchListOn, setwatchListOn] =useState(true)
  const [watchedListOn, setwatchedListOn] =useState(false)
  const [favoritesListOn, setfavoritesListOn] =useState(false)
  
  const [porver, setPorver] = useState([""]);
 const [vistas, setVistas] = useState([""]);
 const [favoritas, setFavoritas] = useState([""]);




   useEffect(() => {
    const fetchMovies = async () => {
      if (watchListOn) {
        const movies = await fetchMoviesByList('Por ver',setFavoritas);
       setPorver(movies);
      } else if (watchedListOn) {
       const movies = await fetchMoviesByList('Vistas' ,setVistas);
       setVistas(movies);
     } else if (favoritesListOn) {
        const movies = await fetchMoviesByList('Favoritas',setFavoritas);
        setFavoritas(movies);
      }
    };

   fetchMovies(); // Llama a la función fetchMovies inmediatamente al cargar el componente

 }, [watchListOn, watchedListOn, favoritesListOn]); // Dependencias del useEffect


const fetchMoviesByList = async (listName, setState) => {

  try {
    const user = JSON.parse(localStorage.getItem('account'));
    if (!user || !user.id) {
      throw new Error('User is not logged in or userId is missing');
    }
    const userId = user.id;

    const response = await axios.get('http://localhost:3001/api/lists/get-movies-by-list', {
      params: {
        userId: userId,
        name: listName,
      }
    });

    const movies = response.data;
    console.log(movies)
    let moviesWithDetails = [];
   
    for (let movie of movies) {
      try {
        const tmdbId = movie.tmdbId;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
          params: {
            api_key: '0023db00b52250d5bed5debec71d21fb',
            language: 'en',
          },
        });

        const movieDetails = response.data;
        moviesWithDetails.push(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
     
    console.log(moviesWithDetails)
    setState(moviesWithDetails);
    return moviesWithDetails; 
  } catch (error) {
    console.error('Error fetching movies by list:', error);
    alert('Failed to fetch movies');
  }
};


//---------------------------------------------------------------------------------------------------------------------------------------------
const removeFromList = async (movie, listName) => {
  try {
    const user = JSON.parse(localStorage.getItem('account'));
    if (!user || !user.id) {
      throw new Error('User is not logged in or userId is missing');
    }
    const userId = user.id;
    await axios.delete('http://localhost:3001/api/movies/delete', {
      data: {
        userId: userId,
        tmdbId: movie.id,
        listName: listName,
      }
    });

    // Refetch movies to update the UI
    await fetchMoviesByList(listName, listName === 'Por ver' ? setPorver : listName === 'Vistas' ? setVistas : setFavoritas);

  } catch (error) {
    console.error('Error removing movie from list:', error);
    alert('Failed to remove movie from list');
  }
};


//---------------------------------------------------------------------------------------------------------------------------------------------

const moveMovieToList = async (movie, fromList, toList) => {
  try {
    const user = JSON.parse(localStorage.getItem('account'));
    if (!user || !user.id) {
      throw new Error('User is not logged in or userId is missing');
    }
    const userId = user.id;
    const tmdbId = movie.id;

    const response = await fetch('http://localhost:3001/api/movies/addToList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, tmdbId,fromList,toList }),
    });

    // Refrescar las listas después de mover la película
    fetchMoviesByList('Por ver', setPorver);
    fetchMoviesByList('Vistas', setVistas);
    fetchMoviesByList('Favoritas', setFavoritas);
  } catch (error) {
    console.error('Error moving movie:', error);
    alert('Failed to move movie');
  }
};

  






  const handleWatchedListOn = () =>{
    setwatchedListOn(true);
    setwatchListOn(false);
    setfavoritesListOn(false)
  } 

  const handleWatchListOn = () =>{
    setwatchListOn(true);
    setwatchedListOn(false);
    setfavoritesListOn(false);
  }

  const handleFavoritesOn = () => {
    setfavoritesListOn(true);
    setwatchedListOn(false);
    setwatchListOn(false)
  }

  


  return (
    <div className='div-fav'>
      <Navegador items={elementosMenu} />

      <Box sx={{ flexGrow: 1, marginTop: 20, paddingLeft: 6, paddingRight: 6 }}>
        <div style={{ display: "flex", gap: "50px" }}>
          {watchListOn && <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My Watchlist</h2>}
          {watchedListOn && <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My WatchedList</h2>}
          {favoritesListOn && <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My Favorites</h2>}

          <button
            className='BotonWatched'
            onClick={handleWatchListOn}
            style={{ backgroundColor: watchListOn ? "#5bd635" : "transparent", transition: "background-color 0.3s" }}
          >
            Watchlist
          </button>

          <button
            className='BotonWatched'
            onClick={handleWatchedListOn}
            style={{ backgroundColor: watchedListOn ? "#5bd635" : "transparent", transition: "background-color 0.3s" }}
          >
            Watched
          </button>

          <button
            className='BotonWatched'
            onClick={handleFavoritesOn}
            style={{ backgroundColor: favoritesListOn ? "#5bd635" : "transparent", transition: "background-color 0.3s" }}
          >
            Favorites
          </button>
        </div>

        <Grid container spacing={0.1}>
          {watchListOn && porver.map((movie) => (
            <Grid xs={6} md={4} lg={3} xl={2.4}>
              <Item className="img-grid">
                <Link
                  key={movie.id}
                  to={`/LayoutPeliculas/${movie.original_title}`}
                  state={{ movieDetails: movie }}
                >
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt="guerra"
                    style={{
                      borderRadius: "16px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Link>
                <div style={{ display: "flex", position: "absolute" }}>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                     onClick={() => removeFromList(movie, 'Por ver')}
                     
                  >
                    <RemoveCircleOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                    onClick={() => moveMovieToList(movie, 'Por ver','Vistas ')}
                  >
                    <RemoveRedEyeIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                     onClick={() => moveMovieToList(movie,"Por ver","Favoritas",)}
                  >
                    <StarOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
                </div>
              </Item>
            </Grid>
          ))}

          {watchedListOn && vistas.map((movie) => (
            <Grid xs={6} md={4} lg={3} xl={2.4}>
              <Item className="img-grid">
                <Link
                  key={movie.id}
                  to={`/LayoutPeliculas/${movie.original_title}`}
                  state={{ movieDetails: movie }}
                >
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt="guerra"
                    style={{
                      borderRadius: "16px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Link>
                <div style={{ display: "flex", position: "absolute" }}>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                    onClick={() => removeFromList(movie, 'Vistas')}
                  >
                    <RemoveCircleOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                     onClick={() => moveMovieToList(movie,"Vistas","Favoritas",)}
                  >
                    <StarOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
                  
                </div>
              </Item>
            </Grid>
          ))}

          {favoritesListOn && favoritas.map((movie) => (
            <Grid xs={6} md={4} lg={3} xl={2.4}>
              <Item className="img-grid">
                <Link
                  key={movie.id}
                  to={`/LayoutPeliculas/${movie.original_title}`}
                  state={{ movieDetails: movie }}
                >
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt="guerra"
                    style={{
                      borderRadius: "16px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Link>
                <div style={{ display: "flex", position: "absolute" }}>
                  <button
                    style={{ border: "none", background: "none", position: "relative" }}
                    id="boton-poster"
                    onClick={() => removeFromList(movie, 'Favoritas')}
                  >
                    <RemoveCircleOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />
                  </button>
            
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Favoritos
