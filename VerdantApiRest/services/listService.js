

// const  List  = require('../db/models/listModel');
//  const  MoviesXList  = require('../db/models/moviesXList');
//  const  User  = require('../db/models/userModel');
//  const  Movie  = require('../db/models/movieModel');
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

module.exports = {
  getMoviesByListName,
  createList
};
