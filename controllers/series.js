const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Series']
    try {
        const result = await mongodb.getDatabase().db('entertainment_api').collection('series').find();
        result.toArray().then((series) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(series);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to obtain the serie.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Series']
    try {
        const seriesId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('entertainment_api').collection('series').find({ _id: seriesId });
        result.toArray().then((series) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(series[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to obtain the serie.' });
    }
};

const createSeries = async (req, res) => {
    //#swagger.tags=['Series']
    try {
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
            res.status(500).json(response.error || 'Error to create the serie.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to create the serie.' });
    }
};

const updateSeries = async (req, res) => {
    //#swagger.tags=['Series']
    try {
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
            res.status(204).send(); 
        } else {
            res.status(500).json(response.error || 'Error to update the serie.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to update the serie.' });
    }
};

const deleteSeries = async (req, res) => {
    //#swagger.tags=['Series']
    try {
        const seriesId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('entertainment_api').collection('series').deleteOne({ _id: seriesId });
        
        if (response.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json(response.error || 'Error to delete the serie.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error to delete the serie.' });
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createSeries, 
    updateSeries, 
    deleteSeries 
};