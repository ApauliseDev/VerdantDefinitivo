const express = require('express');
const listController = require('../controllers/listController');
const router = express.Router();

router.get('/get-movies-by-list', listController.getMoviesByListName);


router.post('/create', listController.createList);

router.post('/add-to-list', listController.addToList);

module.exports = router;
