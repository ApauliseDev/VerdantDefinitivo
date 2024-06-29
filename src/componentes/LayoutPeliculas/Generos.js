import React, { useState, useEffect } from 'react';
import "../../estilos/headerPeliculas.css";

function Generos({ generosId }) {
    const [generos, setGeneros] = useState([]);
  
    useEffect(() => {
      const fetchGeneros = async () => {
        try {
          if (generosId) { // Verifica si generosId está definido
            // Obtener la información de la película, incluyendo los géneros
            const response = await fetch(`https://api.themoviedb.org/3/movie/${generosId}?api_key=0023db00b52250d5bed5debec71d21fb&language=es`);
            const data = await response.json();
            
            // Obtener los nombres de los géneros
            const nombresGeneros = data.genres ? data.genres.map((genero) => genero.name) : [];
            setGeneros(nombresGeneros);
          }
        } catch (error) {
          console.error('Error al cargar los géneros:', error);
        }
      };
  
      fetchGeneros();
    }, [generosId]);
  
    return (
       <div className="generos-pelicula">
        {generos.length > 0 ? (
          generos.map((genero, index) => (
            <p key={index} className="genero">
              {genero}
            </p>
          ))
        ) : (
          <p></p>
        )}
      </div>
    );
  }
  

export default Generos;