import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import '../estilos/simplePaper.css';

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Dokdo",
    fontSize: 24,
  },
});

function SimplePaper() {
  const [genreMovies, setGenreMovies] = useState({});

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const genres = ["Romance", "War", "Comedy", "Horror", "Aventure"];
        const genreMoviesData = {};

        for (const genre of genres) {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0023db00b52250d5bed5debec71d21fb&with_genres=${getGenreId(genre)}`);
          const data = await response.json();
          const firstMovie = data.results.find(movie => !Object.values(genreMoviesData).find(m => m.id === movie.id)); // Encontrar la primera película no repetida
          if (firstMovie) {
            genreMoviesData[genre] = firstMovie;
          }
        }

        setGenreMovies(genreMoviesData);
      } catch (error) {
        console.error('Error al obtener datos de películas:', error);
      }
    };

    fetchGenreMovies();
  }, []);

  // Función para obtener el ID de género correspondiente
  const getGenreId = (genre) => {
    switch (genre) {
      case "Romance":
        return 10749;
      case "War":
        return 10752;
      case "Comedy":
        return 35; 
      case "Horror":
        return 27;
      case "Aventure":
        return 12;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 15,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "flex-end",
          position: "relative",
          "& > :not(style)": {
            m: 1,
            width: 255,
          },
        }}
      >
        {Object.entries(genreMovies).map(([genre, movie]) => (
          <Link
            state={{ genreID: getGenreId(genre) }} // Aquí agregamos el ID del género al estado
            className="link-papers"
            to={`/PelisGrid`}
            key={genre}
          >
            <Paper
              id="Paper-id"
              elevation={3}
              sx={{
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
                position: "relative",
                // Eliminar o cambiar overflow
                overflow: "visible",
              }}
            >
              <img
                id="img-paper"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0.6)",
                  objectFit: "cover", // Mantener la relación de aspecto original
                  borderRadius: "inherit",
                }}
              />
              <Typography
                color="primary"
                variant="h6"
                sx={{
                  position: "absolute",
                  color: "#fff",
                  bottom: 10,
                  zIndex: 1,
                }}
              >
                {genre}
              </Typography>
            </Paper>
          </Link>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default SimplePaper;