import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../estilos/Pelislider.css'
import {Link} from 'react-router-dom'


function Pelislider()    {

    var settings = {
        dots: false,
        lazyLoad:true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1737,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 2,

                }
              },
          {
            breakpoint: 1355,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4 
            }
          },
          {
            breakpoint: 1047,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 2
            }
          },
          {
            breakpoint: 709,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };

      const [movies, setMovies] = useState([]);
      const [categories, setCategories] = useState([
        "Now Playing",
        "Popular",
        "Top Rated",
        "Upcoming"
      ]);
    
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            const urls = [
              'https://api.themoviedb.org/3/movie/now_playing?api_key=0023db00b52250d5bed5debec71d21fb',
              'https://api.themoviedb.org/3/movie/popular?api_key=0023db00b52250d5bed5debec71d21fb',
              'https://api.themoviedb.org/3/movie/top_rated?api_key=0023db00b52250d5bed5debec71d21fb',
              'https://api.themoviedb.org/3/movie/upcoming?api_key=0023db00b52250d5bed5debec71d21fb'
            ];
            const promises = urls.map(url => fetch(url).then(response => response.json()));
            const results = await Promise.all(promises);
            setMovies(results);
          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };
    
        fetchMovies();
      }, []);
    
      return (
        <div className="container-slider">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className='titulo-slider'>{category}</h2>
              <Slider {...settings}>
                {movies[index]?.results?.map(movie => (
                  <div key={movie.id}>
                    <Link
                      key={movie.id}
                      to={`/LayoutPeliculas/${movie.original_title}`}
                      state={{ movieDetails: movie }}
                    
                    > <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></Link>
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      );
    }


export default Pelislider