const Sequelize = require('sequelize');
const models = require('../models') // DB's models
const db = require("../models");

module.exports = function (app) {
    app.post("api/add/player", (req, res, next) => {
        db.player.findAll({ where: req.body })
            .then(data => {
                if (data.length == 0) {
                    db.player.create(d)
                        .then(data => res.status(200).json({ msg: "Insertion Successful!" }))
                        .catch(next)
                }
                else res.status(200).json({ msg: "Player Exists, No Insertion!" })
            })
            .catch(err => next(err))
    })

    app.post("api/add/score", (req, res, next) => {
        db.score.create(req.body)
            .then(data => res.status(200).json({ msg: "Insertion Successful!" }))
            .catch(next)
    })
}