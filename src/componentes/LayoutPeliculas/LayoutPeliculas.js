
import TabsMui from  './Tabs'
import Navegador from '../NavBTSP'
import HeaderPeliculas from "./HeaderPeliculas"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Video from './Video'
import {watchlist,setWatchlist} from '../Favoritos'



function LayoutPeliculas() {

  const elementosMenu = [
    {url:"/LayoutCatalogo",texto:'Home' },
    {url:'/PelisGrid',texto: 'Movies' },
    {url:'/Favoritos', texto: 'WatchList' },
  ]
  
  const location = useLocation();
const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    if (location.state?.movieDetails) {
      setMovieDetails(location.state.movieDetails);
      console.log(location.state.movieDetails);
    }
  }, [location]);



 
  window.scrollTo(0, 0); 
  return (
    <> 
    <Navegador items={elementosMenu}/>
    
    <HeaderPeliculas
      wallpaper= {movieDetails.backdrop_path}
      poster= {movieDetails.poster_path}
      title = {movieDetails.title}
      sinopsis = {movieDetails.overview}
      id={movieDetails.id}
      rating={movieDetails.vote_average}
    />
    <Video id={movieDetails.id} title={movieDetails.title} url={movieDetails.url}/>
    
    {/* <TabsMui  /> */}

    </>    
  )
}

export default LayoutPeliculas

