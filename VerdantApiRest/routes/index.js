const express = require('express');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const listRoutes = require('./listRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/lists', listRoutes);

module.exports = router;
