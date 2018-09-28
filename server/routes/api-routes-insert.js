const Sequelize = require('sequelize');
const models = require('../models') // DB's models
const db = require("../models");

module.exports = function (app) {
    app.post("/api/add/player", (req, res, next) => {
        db.player.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    })

    app.post("/api/add/dealer", (req, res, next) => {
        db.dealer.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    })
    
    app.post("/api/add/location", (req, res, next) => {
        db.location.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    })

    app.post("/api/add/score", (req, res, next) => {
        db.score.create(req.body)
            .then(data => res.status(200).json({ msg: "Insertion Successful!" }))
            .catch(next)
    })
}