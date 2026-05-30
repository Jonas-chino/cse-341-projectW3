
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Series']
    // Asegúrate de que el nombre 'entertainment_api' coincida con tu base de datos
    const result = await mongodb.getDatabase().db('entertainment_api').collection('series').find();
    result.toArray().then((series) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(series);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Series']
    const seriesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('entertainment_api').collection('series').find({ _id: seriesId });
    result.toArray().then((series) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(series[0]);
    });
};

const createSeries = async (req, res) => {
    //#swagger.tags=['Series']
    const newSeries = {
        title: req.body.title,
        creator: req.body.creator,
        releaseYear: req.body.releaseYear,
        totalSeasons: req.body.totalSeasons,
        totalEpisodes: req.body.totalEpisodes,
        network: req.body.network,
        isCurrentlyAiring: req.body.isCurrentlyAiring
    };
    
    const response = await mongodb.getDatabase().db('entertainment_api').collection('series').insertOne(newSeries);
    
    if (response.acknowledged) {
        res.status(201).json(response); 
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al crear la serie.');
    }
};

const updateSeries = async (req, res) => {
    //#swagger.tags=['Series']
    const seriesId = new ObjectId(req.params.id);
    const updatedSeries = {
        title: req.body.title,
        creator: req.body.creator,
        releaseYear: req.body.releaseYear,
        totalSeasons: req.body.totalSeasons,
        totalEpisodes: req.body.totalEpisodes,
        network: req.body.network,
        isCurrentlyAiring: req.body.isCurrentlyAiring
    };
    
    const response = await mongodb.getDatabase().db('entertainment_api').collection('series').replaceOne({ _id: seriesId }, updatedSeries);
    
    if (response.modifiedCount > 0) {
        res.status(204).send(); // 
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al actualizar la serie.');
    }
};

const deleteSeries = async (req, res) => {
    //#swagger.tags=['Series']
    const seriesId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('entertainment_api').collection('series').deleteOne({ _id: seriesId });
    
    if (response.deletedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al eliminar la serie.');
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createSeries, 
    updateSeries, 
    deleteSeries 
};      