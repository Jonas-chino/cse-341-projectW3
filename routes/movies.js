const express = require('express');
const router = require('express').Router()
const moviesController = require('../controllers/movies');

// Rutas para la colección de películas
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', moviesController.createMovie);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;