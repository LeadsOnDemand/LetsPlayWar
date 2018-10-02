const Sequelize = require('sequelize');
const models = require('../models') // DB's models
const db = require("../models");

module.exports = function (app) {
    app.post("/api/add/loc_dealer", (req, res, next) => {
        db.loc_dealer.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    })
    app.post("/api/add/loc_players", (req, res, next) => {
        const insertOneByOne = (list) => {
            if (list.length > 0) {
                let anObj = list.splice(0, 1)
                db.loc_player.findAll({
                    where: {
                        locationId: anObj[0].locationId,
                        playerId: anObj[0].playerId
                    }
                }).then(response => {
                    if (response.length == 0)
                        db.loc_player.create(anObj[0])
                            .then(resp => {
                                if (list.length == 0) res.status(200).json(resp)
                                else insertOneByOne(list)
                            })
                            .catch(err => res.status(500).json(err))
                    else res.status(200).json(response)
                }).catch(err => res.status(500).json(err))
            }
        }
        insertOneByOne([...req.body])
    })
    app.post("/api/add/player", (req, res, next) => {
        db.player.findAll({ where: { name: req.body.name } })
            .then(response => {
                if (response.length == 0)
                    db.player.create(req.body)
                        .then(data => res.status(200).json(data))
                        .catch(err => res.status(500).json(err))
                else res.status(200).json(response)
            }).catch(err => res.status(500).json(err))
    })

    app.post("/api/add/dealer", (req, res, next) => {
        db.dealer.findAll({
            where: {
                name: req.body.name
            }
        })
            .then(response => {
                if (response.length == 0)
                    db.dealer.create(req.body)
                        .then(data => res.status(200).json(data))
                        .catch(err => res.status(500).json(err))
                else res.status(200).json(response)
            })

    })

    app.post("/api/add/location", (req, res, next) => {
        db.location.findAll({
            where: {
                name: req.body.name,
                address: req.body.address
            }
        })
            .then(response => {
                if (response.length == 0)
                    db.location.create(req.body)
                        .then(data => res.status(200).json(data))
                        .catch(err => res.status(500).json(err))
                else res.status(200).json(response)
            }).catch(err => res.status(500).json(err))
    })

    app.post("/api/add/score", (req, res, next) => {
        const scoreByScore = (list) => {
            let aScore = []
            if (list.length > 0) {
                aScore = list.splice(0, 1)
                db.loc_player.findAll({ where: { locationId: aScore[0].locationId, playerId: aScore[0].playerId } })
                    .then(response => {
                        db.score.create({
                            isWinning: aScore[0].isWinning,
                            gain: aScore[0].gain,
                            locPlayerId: response[0].id
                        }).then(scoreResp => {
                            if (list.length == 0)
                                res.status(200).json(scoreResp)
                            else scoreByScore(list)
                        }).catch(err => res.status(500).json(err))

                    }).catch(err => res.status(500).json(err))
            }
        }
        scoreByScore([...req.body])
    })
}