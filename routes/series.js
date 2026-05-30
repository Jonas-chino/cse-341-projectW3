const express = require('express');
const router = require('express').Router()
const seriesController = require('../controllers/series');


router.get('/', seriesController.getAll);
router.get('/:id', seriesController.getSingle);
router.post('/', seriesController.createSeries);
router.put('/:id', seriesController.updateSeries);
router.delete('/:id', seriesController.deleteSeries);

module.exports = router;