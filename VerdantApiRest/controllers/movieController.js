const movieService = require('../services/movieService');

const fetchAndSaveMovie = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const movie = await movieService.fetchAndSaveMovie(tmdbId);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching and saving movie', error: error.message });
  }
};

const removeMovieFromList = async (req, res) => {
  try {
    const { userId, tmdbId, listName } = req.body;
    await movieService.removeMovieFromList(userId, tmdbId, listName);
    res.status(200).json({ message: 'Movie removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove movie from list', error: error.message });
  }
};


const moveMovieToList = async (req, res) => {
  try {
    const { userId, tmdbId, fromList, toList } = req.body;
    await movieService.moveMovieToList(userId, tmdbId, fromList, toList);
    res.status(200).json({ message: 'Movie moved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move movie', error: error.message });
  }
};





module.exports = {
  fetchAndSaveMovie,
  removeMovieFromList,
  moveMovieToList
};
