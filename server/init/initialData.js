const db = require("../models");

const players = require("./players.js");

let initialData = () => {
    db.location.findAll()
        .then(data => {
            if (data.length == 0) {
                db.location.create({ name: "LeadsOnDemand", address: "Lake Mary, Florida" })
                    .then(data => {
                        const locId = data.id
                        db.dealer.findAll().then(data => {
                            if (data.length == 0) {
                                db.dealer.create({ name: "James Bond" }).then(dealer => {
                                    db.loc_dealer.create({locationId: locId, dealerId: dealer.id}).then(response => {
                                        // db.player.bulkCreate(players).then(response => {
                                            console.log("Ready to Go!")
                                        // }).catch(err => console.log("Player Create, err: " + err))                                        
                                    }).catch(err => console.log("Loc_dealer Create, err: " + err))
                                }).catch(err => console.log("Dealer Create, err: " + err))
                            }
                        }).catch(err => console.log("Dealer 'findAll', err: " + err))
                        
                    }).catch(err => console.log("Location Create, err: " + err))
            }
        })
        .catch(err => console.log("Init - location findAll, err: " + err))
}

module.exports = initialData;