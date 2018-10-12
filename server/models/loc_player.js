module.exports = function (sequelize, Sequelize) {
    const Loc_player = sequelize.define("loc_player", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
    });

    return Loc_player;
}