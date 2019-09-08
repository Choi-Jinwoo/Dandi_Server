exports.sequelizeInit = async () => {
    const models = require("./models");

    models.sequelize.sync({ force : false })
    .then(() => {
            console.log("Databases sync");
    })
    .catch((err) => {
            console.error(err);
    })
}