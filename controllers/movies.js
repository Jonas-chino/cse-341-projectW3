const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const result = await mongodb.getDatabase().db('entertainment_api').collection('movies').find();
        result.toArray().then((movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to obtain the movies.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('entertainment_api').collection('movies').find({ _id: movieId });
        result.toArray().then((movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to obtain the movie.' });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movie = {
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            rating: req.body.rating,
            runtimeMinutes: req.body.runtimeMinutes,
            boxOfficeMillions: req.body.boxOfficeMillions,
            hasWonOscars: req.body.hasWonOscars
        };
        const response = await mongodb.getDatabase().db('entertainment_api').collection('movies').insertOne(movie);
        
        if (response.acknowledged) {
            res.status(201).json(response); 
        } else {
            res.status(500).json(response.error || 'error to create the movie.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'error to create the movie' });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const movie = {
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            rating: req.body.rating,
            runtimeMinutes: req.body.runtimeMinutes,
            boxOfficeMillions: req.body.boxOfficeMillions,
            hasWonOscars: req.body.hasWonOscars
        };
        
        const response = await mongodb.getDatabase().db('entertainment_api').collection('movies').replaceOne({ _id: movieId }, movie);
        
        if (response.modifiedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json(response.error || 'error to update the movie');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'error to update the movie.' });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('entertainment_api').collection('movies').deleteOne({ _id: movieId });
        
        if (response.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json(response.error || 'error to delete the movie.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'error to delete the movie.' });
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createMovie, 
    updateMovie, 
    deleteMovie 
};