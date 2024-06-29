import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../estilos/sliderCatalogo.css'


// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export  function SliderCatalogo() {
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

const movielist2 = movielist.slice(0,10)
const random = Math.random().toString(36).substring(2, 7);


  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        style={ {
          "--swiper-navigation-color":"#5AD635",
          "--swiper-pagination-color":"#5AD635",
          "--swiper-pagination-bottom":"100px",
          
         }}
        className="mySwiper"
      >

      {
        movielist2.map((movie) => (

          <SwiperSlide id="slideSwip">
          <img id="slideimg" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}?v=${random}`} alt= {movie.original_title}/>
          <div style={{width:"98%",height:"250px" , position:"absolute"}} > 
          <article style={{display:"flex", width:"100%", background:"inheredit", flexDirection: "row" }}> 
            <h6 style={{color:"antiquewhite", fontSize:"30px", fontFamily:"Cinzel Bold", padding:"12px 0px 0px 12px" }}> {movie.title}</h6>
          </article>
          <p style={{color:"antiquewhite", padding:"10px",fontFamily:"Cinzel", fontWeight:"700"}}> {movie.overview} </p>
          
          </div>
        </SwiperSlide>
        ))
      }
      </Swiper>
    </>
  );
}
