module.exports = function (sequelize, Sequelize) {
    const Score = sequelize.define("score", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        isWinning: {
            type: Sequelize.BOOLEAN,
            validate: {
                notEmpty: true,
            }
        },
        gain: {
            type: Sequelize.INTEGER
        }
    });

    return Score;
}