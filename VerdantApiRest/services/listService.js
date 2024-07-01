

// const  List  = require('../db/models/listModel');
//  const  MoviesXList  = require('../db/models/moviesXList');
//  const  User  = require('../db/models/userModel');
//  const  Movie  = require('../db/models/movieModel');

const axios = require('axios')
const { List, MoviesXList, Movie, User } = require('../db/models');



const createList = async (userId, name) => {
  try {
    // Verifica si el usuario existe
    const user = await User.findByPk(userId)
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica si ya existe una lista con el mismo nombre para el mismo usuario
    const existingList = await List.findOne({ where: { userId, name } });
    if (existingList) {
      throw new Error('A list with this name already exists for this user');
    }

    // Crea la nueva lista
    const newList = await List.create({ userId, name });
    return newList;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};



const getMoviesByListName = async (userId, name) => {
  try {
    const list = await List.findOne({
      where: {
        userId,
        name
      },
      include: [{
        model: Movie,
        as: 'movies',
        through: { attributes: [] }  // Evitar incluir atributos de MoviesXList
      }]
    });

    if (!list) {
      throw new Error('List not found');
    }

    return list.movies;
  } catch (error) {
    console.error('Error fetching movies by list name:', error);
    throw error;
  }
};

const addToList = async (userId, tmdbId, toListName) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const toList = await List.findOne({
    where: {
      userId: userId,
      name: toListName
    }
  });

  if (!toList) {
    throw new Error('List not found');
  }

  // Obtener detalles de la película desde la API de TMDB
  const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
    params: {
      api_key: '0023db00b52250d5bed5debec71d21fb',
      language: 'en',
    },
  });

  const movieData = movieDetails.data;

  // Find or create the movie
  let movie;
  try {
    [movie, created] = await Movie.findOrCreate({
      where: { tmdbId: tmdbId },
      defaults: {
        tmdbId: tmdbId,
        title: movieData.title,
        // Añade otros campos que consideres necesarios
      }
    });
  } catch (error) {
    throw new Error(`Error finding or creating movie: ${error.message}`);
  }

  // Add the movie to the list
  try {
    await toList.addMovie(movie);
  } catch (error) {
    throw new Error(`Error adding movie to list: ${error.message}`);
  }
};


module.exports = {
  getMoviesByListName,
  createList,
  addToList
  
};
