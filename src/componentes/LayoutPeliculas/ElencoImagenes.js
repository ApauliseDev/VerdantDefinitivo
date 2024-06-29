import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "../../estilos/ElencoImagenes.css";

function ElencoImagenes({ movieId }) {
  const [elenco, setElenco] = useState([]);

  useEffect(() => {
    const fetchElenco = async () => {
      try {
        // Obtener la información del elenco de la película
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0023db00b52250d5bed5debec71d21fb`);
        const data = await response.json();
        
        // Filtrar solo los primeros 5 miembros del elenco
        const filteredElenco = data.cast.filter(cast => cast.profile_path !== null);
        const primerosCinco = filteredElenco.slice(0, 5);

        // Para cada miembro del elenco, obtener su imagen y nombre
        const promises = primerosCinco.map(async (actor) => {
          const imgResponse = await fetch(`https://api.themoviedb.org/3/person/${actor.id}/images?api_key=0023db00b52250d5bed5debec71d21fb`);
          const imgData = await imgResponse.json();
          const imagen = imgData.profiles.length > 0 ? `https://image.tmdb.org/t/p/w500${imgData.profiles[0].file_path}` : null;
          return { nombre: actor.name, imagen };
        });

        // Esperar todas las promesas para obtener las imágenes y nombres del elenco
        const elencoCompleto = await Promise.all(promises);
        setElenco(elencoCompleto);
      } catch (error) {
        console.error('Error al cargar el elenco:', error);
      }
    };

    fetchElenco();
  }, [movieId]);

  return (
    <div>
      <ImageList cols={5}>
        {elenco.map((actor, index) => (
          <ImageListItem key={index}>
            <img srcSet={actor.imagen} src={actor.imagen} alt={actor.nombre} id="imagen-redondeada" />
            <div className="overlay">
              <div className="name">{actor.nombre}</div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default ElencoImagenes
