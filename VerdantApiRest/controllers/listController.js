const { use } = require('../routes');
const listService = require('../services/listService');


const createList = async (req, res) => {
  const { userId, name } = req.body;

  try {
    const newList = await listService.createList(userId, name);
    res.status(201).json({ message: 'List created successfully', list: newList });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getMoviesByListName = async (req, res) => {
  try {
    const { userId, name } = req.query;
    console.log(name)
    const movies = await listService.getMoviesByListName(userId, name);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies by list ', error: error.message });
  }
};



const addToList = async (req, res) => {
  const { userId, tmdbId, toListName } = req.body;
  console.log(userId)
  console.log(tmdbId)
  console.log(toListName)
  
  

  try {
    await listService.addToList(userId, tmdbId, toListName);
    res.status(200).send('Movie added to list successfully');
  } catch (error) {
    console.error('Error adding movie to list:', error);
    res.status(500).send('Error adding movie to list');
  }
};


module.exports = {
  getMoviesByListName,
  createList,
  addToList
};
