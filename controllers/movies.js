const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    // Nota: Cambia 'entertainment_api' por el nombre exacto de tu nueva base de datos en MongoDB si es diferente.
    const result = await mongodb.getDatabase().db('entertainment_api').collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('entertainment_api').collection('movies').find({ _id: movieId });
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });
};

const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
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
        res.status(201).json(response); // 201 significa "Creado"
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al crear la película.');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
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
        res.status(500).json(response.error || 'Ocurrió un error al actualizar la película.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('entertainment_api').collection('movies').deleteOne({ _id: movieId });
    
    if (response.deletedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al eliminar la película.');
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createMovie, 
    updateMovie, 
    deleteMovie 
};