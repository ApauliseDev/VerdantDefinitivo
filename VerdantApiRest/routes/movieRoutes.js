const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();




router.delete('/delete', movieController.removeMovieFromList);
router.post('/addToList', movieController.moveMovieToList);








module.exports = router;



