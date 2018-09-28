const Sequelize = require('sequelize');
const models = require('../models') // DB's models
const db = require("../models");

module.exports = function (app) {
    app.get("/api/get/dealers", (req, res, next) => {
        db.dealer.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })

    app.get("/api/get/locations", (req, res, next) => {
        db.location.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })

    app.get("/api/get/players", (req, res, next) => {
        db.player.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })

    app.get("/api/get/location/infos", (req, res, next) => {
        db.location.findAll({
            include: [
                {
                    model: db.loc_dealer,
                    include: [
                        {
                            model: db.dealer,
                            attributes: ['id', 'name']
                        }
                    ]
                },
                {
                    model: db.loc_player,
                    include: [
                        {
                            model: db.player,
                            attributes: ['id', 'name']
                        },
                        { model: db.score }
                    ]
                }
            ]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })
}