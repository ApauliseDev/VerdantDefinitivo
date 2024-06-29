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

module.exports = {
  fetchAndSaveMovie,
};
