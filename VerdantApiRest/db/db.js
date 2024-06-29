const { sequelize } = require('../config');
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const List = require('../models/listModel');
const MoviesXList = require('../models/moviesXList');



const syncModels = async () => {
  await sequelize.sync({ force: true });  // O { alter: true } si no quieres perder datos
};

syncModels();

module.exports = { syncModels };