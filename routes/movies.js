const express = require('express');
const router = require('express').Router()
const moviesController = require('../controllers/movies');

const { isAuthenticated } = require("../middleware/authenticate");


router.get("/", moviesController.getAll);
router.get("/:id", moviesController.getSingle);


router.post("/", isAuthenticated, moviesController.createMovie);
router.put("/:id", isAuthenticated, moviesController.updateMovie);
router.delete("/:id", isAuthenticated, moviesController.deleteMovie);

module.exports = router;