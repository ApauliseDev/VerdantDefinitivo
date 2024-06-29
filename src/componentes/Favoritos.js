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

  const { addToWatched, vistas, setVistas, removeFromVistas } = useContext(DataContext)
  const [envistas, setEnvistas] = useState(false)
  const [watchListOn, setwatchListOn] =useState(true)
  const [watchedListOn, setwatchedListOn] =useState(false)
  const [favoritesListOn, setfavoritesListOn] =useState(false)

  const [porver, setPorver] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMoviesByList('Por ver'); // Obtener películas de la lista "Por ver"
      setPorver(movies);
    };

    fetchMovies();
  }, []);

  const getMoviesByList = async (listName) => {
    try {
      const user = JSON.parse(localStorage.getItem('account')); // Asegúrate de que el objeto 'account' está en el localStorage
      if (!user || !user.id) {
        throw new Error('User is not logged in or userId is missing');
      }
      const userId = user.id;

      const response = await axios.get(`http://localhost:3001/api/lists/get-movies-by-list`, {
        params: {
          userId: userId,
          name: listName,
        }
      });

      const movies = response.data.movies;
      let moviesWithDetails = [];

      for (let movie of movies) {
          try {
              const tmdbId = movie.tmdbId;
              const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
                  params: {
                      api_key: '0023db00b52250d5bed5debec71d21fb', // Reemplaza con tu propia API key de TMDB
                      language: 'es', // Opcional: ajusta el idioma según prefieras
                  },
              });
  
              // Procesar la respuesta de TMDB y guardar en la lista de películas con detalles
              const movieDetails = response.data;
              moviesWithDetails.push(movieDetails);
          } catch (error) {
              console.error(`Error al obtener detalles de la película con tmdbId `, error);
              // Puedes manejar el error según sea necesario (por ejemplo, omitir esta película o registrar el error)
          }
      }

      return moviesWithDetails;
    } catch (error) {
      console.error('Error fetching movies by list:', error);
      alert('Failed to fetch movies');
      return [];
    }
  };




  const removeFromPorver = (movie) => {
    const updater = [...porver]
    updater.forEach((item, index) => {
      if (item.id === movie.id) {
        updater.splice(index, 1)
      }
      setPorver(updater)
    })
  }


  const addToWatchList = (movie) => {
    const check = porver.every(item => {
      return item.id !== movie.id
    })

    if (check) {
      setPorver([...porver, movie])
      alert("Great choice! :)")
    } else {
      alert("This movie is already added")
    }
  }

  const handleWatchedOn = () =>{
    setwatchedListOn(true);
    setwatchListOn(false);
    setfavoritesListOn(false)
  } 

  const handleWatchlistOn = () =>{
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


        { watchListOn ?  <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My Watchlist</h2> : watchedListOn ? 
        <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My WatchedList</h2> : 
        <h2 style={{ color: "#fff", fontFamily: "Cinzel Semibold" }}>My Favorites </h2> }
         
        <button className='BotonWatched'
         onClick={handleWatchlistOn}  > Watchlist  </button>
        <button className='BotonWatched'
          onClick={handleWatchedOn}  > Watched  </button> 
        <button className='BotonWatched'
         onClick={handleFavoritesOn} 
        > Favorites  </button>
        </div>

          <Grid container spacing={0.1}>
            {envistas ?
              vistas.map((movie) => (
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
                        onClick={() => {
                          removeFromVistas(movie)
                        }}
                      > {<RemoveCircleOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />}</button>

                      <button
                        style={{ border: "none", background: "none", position: "relative" }}
                        id="boton-poster"
                        onClick={() => {
                          addToWatchList(movie)

                        }}
                      > {<RemoveRedEyeIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />}</button> </div>
                  </Item>
                </Grid>
              ))
              : porver ? porver.map((movie) => (
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
                        onClick={() => {
                          removeFromPorver(movie)
                        }}
                      > {<RemoveCircleOutlineIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />}</button>

                      <button
                        style={{ border: "none", background: "none", position: "relative" }}
                        id="boton-poster"
                        onClick={() => {
                          addToWatched(movie)
                        }}

                    > {<RemoveRedEyeIcon style={{ border: "none", color: "#5AD635", fontSize: "50px" }} />}</button> </div>

                  </Item>
                </Grid>
              )) : null
            }
          </Grid>
        </Box>
      </div>
    
  )
}

export default Favoritos
