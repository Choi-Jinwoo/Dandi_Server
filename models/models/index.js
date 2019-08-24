const env = require("../../config/database");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect : "mysql",
    logging : false,

    define : {
        timestamps : false
    }
});

const User = require("./User")(sequelize, Sequelize);
const School = require("./School")(sequelize, Sequelize);
const Channel = require("./Channel")(sequelize, Sequelize);
const ChannelUser = require("./ChannelUser")(sequelize, Sequelize);
const ChannelEvent = require("./ChannelEvent")(sequelize, Sequelize);

const models = {};

 fs.readdirSync(__dirname) //현재 디렉터리 내의 파일 조회
     .filter((file) => (file.indexOf(".") !== 0) && (file !== "index.js"))
     .forEach((file) => {
         const extName = path.extname(path.join(__dirname, file));
         const baseName = path.basename(path.join(__dirname, file), extName);
         const model = sequelize.import(path.join(__dirname, file));
         models[baseName] = model;
     })

Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
})

module.exports = {
    sequelize,
    User,
    School,
    Channel,
    ChannelUser,
    ChannelEvent,
};