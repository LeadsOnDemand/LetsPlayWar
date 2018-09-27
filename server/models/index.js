'use strict';

// file containing: module.exports = { db_pwd: <YOUR PASSWORD FOR YOUR DATABASE>}
var conf = require('../config.js');  // <-------------------- Need to create the file with 

var Sequelize = require('sequelize');

var db = {};

var DBInfo = {
    username: "root",
    password: conf.db_pwd,   // <----------------- Your Password here
    database: "lets_play_war",
    host: "127.0.0.1",
    dialect: "mysql",
};

var sequelize = new Sequelize(DBInfo.database, DBInfo.username, DBInfo.password, {
    host: DBInfo.host,
    dialect: DBInfo.dialect,
    logging: false,
    freezeTableName: true,
    operatorsAliases: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.dealer = require('../models/dealer.js')(sequelize, Sequelize)
db.loc_dealer = require('../models/loc_dealer.js')(sequelize, Sequelize)
db.loc_player = require('../models/loc_player.js')(sequelize, Sequelize)
db.location = require('../models/location.js')(sequelize, Sequelize)
db.player = require('../models/player.js')(sequelize, Sequelize)
db.score = require('../models/score.js')(sequelize, Sequelize)

//=========================================================================================================//

db.dealer.hasMany(db.loc_dealer, { onDelete: 'CASCADE', hooks: true })
db.loc_dealer.belongsTo(db.dealer)

db.location.hasMany(db.loc_dealer, { onDelete: 'CASCADE', hooks: true })
db.loc_dealer.belongsTo(db.location)

db.location.hasMany(db.loc_player, { onDelete: 'CASCADE', hooks: true })
db.loc_player.belongsTo(db.location)

db.player.hasMany(db.loc_player, { onDelete: 'CASCADE', hooks: true })
db.loc_player.belongsTo(db.player)

db.loc_player.hasMany(db.score, { onDelete: 'CASCADE', hooks: true })
db.score.belongsTo(db.loc_player)

//=========================================================================================================//

module.exports = db;