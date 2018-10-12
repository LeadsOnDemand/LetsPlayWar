module.exports = function (sequelize, Sequelize) {
    const Loc_dealer = sequelize.define("loc_dealer", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }
    });

    return Loc_dealer;
}