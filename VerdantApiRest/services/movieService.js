const axios = require('axios');
const { List, MoviesXList, Movie, User } = require('../db/models');



const removeMovieFromList = async (userId, tmdbId, listName) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    const list = await List.findOne({
      where: {
        userId: userId,
        name: listName
      },
      include: [{
        model: Movie,
        as: 'movies',
        where: { tmdbId: tmdbId }
      }]
    });
  
    if (!list) {
      throw new Error('List or movie not found');
    }
  
    const movie = list.movies[0];
    await list.removeMovie(movie);
  };


  const moveMovieToList = async (userId, tmdbId, fromListName, toListName) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    const fromList = await List.findOne({
      where: {
        userId: userId,
        name: fromListName
      },
      include: [{
        model: Movie,
        as: 'movies',
        where: { tmdbId: tmdbId }
      }]
    });
  
    const toList = await List.findOne({
      where: {
        userId: userId,
        name: toListName
      }
    });
  
    if (!fromList || !toList || fromList.movies.length === 0) {
      throw new Error('List or movie not found');
    }
  
    const movie = fromList.movies[0];
    if (fromListName === 'Por ver') {
        await fromList.removeMovie(movie);
      }
    await toList.addMovie(movie);

    
  };
  
  

module.exports = {
    removeMovieFromList,
    moveMovieToList
};
