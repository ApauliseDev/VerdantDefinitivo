import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import 'swiper/css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function CatalogoSlider() {
    const[movielist,setMovielist] = useState([])

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

  console.log(movielist)

const movielist2 = movielist.slice(0,6)
const random = Math.random().toString(36).substring(2, 7);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <div className="slider-container">
          <Slider {...settings}>
          {movielist2.map((movie,index )=>{
            return(
            <div >
              <img style={{width:"95%", height:"70%"}} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}?v=${random}`} alt= {movie.title}  />
            </div>)

          } )}
          </Slider>
        </div>
      );
    }

export default CatalogoSlider
