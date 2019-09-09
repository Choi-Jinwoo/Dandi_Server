const colorConsole = require("../lib/console");

exports.sequelizeInit = async () => {
    const models = require("./models");

    models.sequelize.sync({ force : false })
    .then(() => {
        colorConsole.green("Databases sync");
    })
    .catch((err) => {
        colorConsole.red(err.message);
    })
}