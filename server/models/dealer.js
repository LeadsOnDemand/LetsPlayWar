module.exports = function (sequelize, Sequelize) {
    const Dealer = sequelize.define("dealer", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        }
    });

    return Dealer;
}