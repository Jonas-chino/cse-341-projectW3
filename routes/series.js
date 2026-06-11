const express = require('express');
const router = require('express').Router()
const seriesController = require('../controllers/series');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', seriesController.getAll);
router.get('/:id', seriesController.getSingle);

router.post('/', isAuthenticated, seriesController.createSeries);
router.put('/:id', isAuthenticated, seriesController.updateSeries);
router.delete('/:id', isAuthenticated, seriesController.deleteSeries);

module.exports = router;